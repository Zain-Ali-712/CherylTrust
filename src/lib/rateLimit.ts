import { LRUCache } from "lru-cache";
import { NextRequest } from "next/server";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        } else {
          tokenCount[0] += 1;
          tokenCache.set(token, tokenCount);
        }
        
        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        
        if (isRateLimited) {
          return reject();
        }
        
        return resolve();
      }),
  };
}

export function getIP(request: NextRequest): string {
    // Attempt to get the real IP from standard proxy headers
    let ip = request.headers.get("x-forwarded-for") || 
             request.headers.get("x-real-ip") || 
             "127.0.0.1";
             
    // x-forwarded-for can be a comma-separated list of IPs. Take the first one.
    if (ip.includes(",")) {
        ip = ip.split(",")[0].trim();
    }
    
    return ip;
}
