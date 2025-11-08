/**
 * System Design Library
 * 15 comprehensive system design problems with detailed solutions
 * Based on real interview questions from top tech companies
 */

export interface SystemDesignProblem {
  id: string;
  title: string;
  difficulty: 'Medium' | 'Hard';
  companies: string[];
  estimated_time: string;

  // Problem overview
  problem_statement: string;
  requirements: {
    functional: string[];
    non_functional: string[];
    out_of_scope?: string[];
  };

  // Scale estimation
  capacity_estimation: {
    users: string;
    requests_per_day: string;
    storage: string;
    bandwidth: string;
  };

  // High-level design
  high_level_design: {
    overview: string;
    components: string[];
    diagram_description: string;
  };

  // Detailed design
  detailed_design: {
    api_design: {
      name: string;
      method: string;
      endpoint: string;
      params?: string[];
      response?: string;
    }[];
    database_schema: {
      table: string;
      fields: string[];
      indexes?: string[];
    }[];
    key_algorithms: {
      name: string;
      description: string;
      complexity?: string;
    }[];
  };

  // Deep dives
  deep_dive_topics: {
    topic: string;
    discussion: string;
  }[];

  // Trade-offs
  trade_offs: {
    decision: string;
    option_a: string;
    option_b: string;
    recommendation: string;
  }[];

  // Follow-up questions
  follow_up_questions: string[];

  // References
  references?: string[];
}

export const SYSTEM_DESIGN_PROBLEMS: SystemDesignProblem[] = [
  // ============================================
  // 1. DESIGN TWITTER
  // ============================================
  {
    id: 'design-twitter',
    title: 'Design Twitter / X',
    difficulty: 'Hard',
    companies: ['Meta', 'Google', 'Amazon', 'Twitter', 'Microsoft'],
    estimated_time: '45-60 minutes',

    problem_statement: 'Design a social media platform like Twitter where users can post tweets, follow other users, and see a timeline of tweets from people they follow.',

    requirements: {
      functional: [
        'Users can post tweets (280 characters)',
        'Users can follow/unfollow other users',
        'Users can see their home timeline (tweets from followed users)',
        'Users can see user profile and their tweets',
        'Users can like and retweet',
        'Users can search tweets'
      ],
      non_functional: [
        'Highly available',
        'Low latency for timeline generation (<200ms)',
        'Eventually consistent (it\'s okay if followers see tweets after a few seconds)',
        'Scale to 500M users, 200M daily active users'
      ],
      out_of_scope: [
        'Direct messaging',
        'Media uploads (images, videos)',
        'Notifications',
        'Trending topics'
      ]
    },

    capacity_estimation: {
      users: '500M total users, 200M DAU',
      requests_per_day: '400M tweets/day (~5000 tweets/sec), 100B timeline reads/day',
      storage: '~200GB per day (tweets only), ~70TB per year',
      bandwidth: 'Read-heavy: 50MB/s write, 5GB/s read'
    },

    high_level_design: {
      overview: 'Use microservices architecture with separate services for tweets, timelines, users, and social graph. Use fan-out approach for timeline generation.',
      components: [
        'Load Balancer',
        'API Gateway',
        'Tweet Service',
        'Timeline Service',
        'User Service',
        'Social Graph Service',
        'Tweet Database (Cassandra)',
        'User Database (PostgreSQL)',
        'Redis Cache for timelines',
        'Message Queue (Kafka) for fan-out'
      ],
      diagram_description: 'Client → Load Balancer → API Gateway → Microservices (Tweet/Timeline/User/Graph) → Databases (Cassandra/PostgreSQL) + Cache (Redis) + Message Queue (Kafka)'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Post Tweet',
          method: 'POST',
          endpoint: '/api/v1/tweets',
          params: ['user_id', 'content', 'timestamp'],
          response: 'tweet_id'
        },
        {
          name: 'Get Home Timeline',
          method: 'GET',
          endpoint: '/api/v1/timeline/home',
          params: ['user_id', 'cursor', 'limit'],
          response: 'tweets[]'
        },
        {
          name: 'Follow User',
          method: 'POST',
          endpoint: '/api/v1/users/{user_id}/follow',
          params: ['follower_id', 'followee_id'],
          response: 'success'
        }
      ],
      database_schema: [
        {
          table: 'tweets',
          fields: ['tweet_id (PK)', 'user_id', 'content', 'created_at', 'likes_count', 'retweets_count'],
          indexes: ['user_id', 'created_at']
        },
        {
          table: 'users',
          fields: ['user_id (PK)', 'username', 'email', 'created_at', 'followers_count', 'following_count'],
          indexes: ['username']
        },
        {
          table: 'social_graph',
          fields: ['follower_id', 'followee_id', 'created_at'],
          indexes: ['follower_id', 'followee_id', 'composite(follower_id, followee_id)']
        },
        {
          table: 'timeline_cache (Redis)',
          fields: ['user_id', 'tweet_ids[] (sorted by timestamp)']
        }
      ],
      key_algorithms: [
        {
          name: 'Fan-out on Write',
          description: 'When user posts tweet, immediately write to all followers\' timelines in Redis. Good for read-heavy workloads.',
          complexity: 'Write: O(N) where N = followers, Read: O(1)'
        },
        {
          name: 'Fan-out on Read',
          description: 'When user requests timeline, query all followed users\' tweets and merge. Good for users with many followers.',
          complexity: 'Write: O(1), Read: O(N) where N = following'
        },
        {
          name: 'Hybrid Approach',
          description: 'Use fan-out on write for regular users, fan-out on read for celebrities with millions of followers.',
          complexity: 'Best of both worlds'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Timeline Generation Strategy',
        discussion: 'For regular users (<1M followers): Use fan-out on write. When user tweets, push to all followers\' timeline cache in Redis. This makes reads O(1) fast. For celebrities (>1M followers): Use fan-out on read. Store tweets in Cassandra, fetch at read time. Hybrid: Pre-compute timelines for active users, compute on-demand for inactive users.'
      },
      {
        topic: 'Handling Celebrity Users',
        discussion: 'Users with millions of followers (like Obama, Musk) cannot use fan-out on write - it would take too long. Instead: 1) Store their tweets separately, 2) When follower requests timeline, merge celebrity tweets at read time, 3) Cache merged results, 4) Use separate high-capacity systems for celebrity tweets.'
      },
      {
        topic: 'Sharding Strategy',
        discussion: 'Shard tweets by tweet_id using consistent hashing. Shard timelines by user_id. Shard social graph by follower_id. This distributes load evenly. Use Cassandra for tweets (time-series data, write-heavy). Use Redis for timeline cache (read-heavy, TTL).'
      },
      {
        topic: 'Caching Strategy',
        discussion: 'Cache timelines in Redis with 10-minute TTL. Cache user profiles and social graph in Redis. Use CDN for static assets. Invalidate cache on new tweet (push to Redis). Pre-warm cache for active users during off-peak hours.'
      }
    ],

    trade_offs: [
      {
        decision: 'Timeline Generation',
        option_a: 'Fan-out on Write: Pre-compute timelines, fast reads (O(1)), but expensive writes (O(N followers))',
        option_b: 'Fan-out on Read: Compute timelines on demand, fast writes (O(1)), but slow reads (O(N following))',
        recommendation: 'Use Hybrid: Fan-out on write for regular users, fan-out on read for celebrities. Best of both worlds.'
      },
      {
        decision: 'Database Choice',
        option_a: 'SQL (PostgreSQL): ACID, relations, but hard to scale writes',
        option_b: 'NoSQL (Cassandra): Scalable writes, time-series friendly, but eventual consistency',
        recommendation: 'Use both: PostgreSQL for users (need consistency), Cassandra for tweets (need write scalability).'
      },
      {
        decision: 'Consistency vs Availability',
        option_a: 'Strong Consistency: All followers see tweet immediately, but higher latency and less available',
        option_b: 'Eventual Consistency: Some followers see tweet after delay, but lower latency and more available',
        recommendation: 'Eventual consistency. It\'s acceptable if followers see tweets within 1-2 seconds. Prioritize availability.'
      }
    ],

    follow_up_questions: [
      'How would you handle tweet edits?',
      'How would you implement trending hashtags?',
      'How would you prevent spam and bots?',
      'How would you implement retweets vs quote tweets?',
      'How would you rank timeline (algorithmic feed)?',
      'How would you handle deleted tweets?',
      'How would you implement search?',
      'How would you handle media (images/videos)?'
    ],

    references: [
      'Twitter Engineering Blog',
      'Designing Data-Intensive Applications (Martin Kleppmann)',
      'System Design Interview – An Insider\'s Guide (Alex Xu)'
    ]
  },

  // ============================================
  // 2. DESIGN URL SHORTENER
  // ============================================
  {
    id: 'design-url-shortener',
    title: 'Design URL Shortener (like bit.ly)',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Uber', 'Adobe'],
    estimated_time: '30-45 minutes',

    problem_statement: 'Design a URL shortening service that takes long URLs and generates short, unique aliases. When users visit the short URL, they should be redirected to the original URL.',

    requirements: {
      functional: [
        'Given a long URL, generate a unique short URL',
        'Given a short URL, redirect to original URL',
        'Short URLs should be 7 characters (a-z, A-Z, 0-9)',
        'URLs should never expire (or have configurable expiration)',
        'Optional: Custom short URLs',
        'Optional: Analytics (click tracking)'
      ],
      non_functional: [
        'Highly available (redirects must work 99.99% of the time)',
        'Low latency for redirects (<50ms)',
        'Short URLs should be unpredictable',
        'Scale to 100M URLs, 10B redirects per month'
      ]
    },

    capacity_estimation: {
      users: '100M URLs created, 10B redirects per month',
      requests_per_day: 'Write: 38 URLs/sec, Read: 3800 redirects/sec (100:1 read-write ratio)',
      storage: '~10GB for 100M URLs (100 bytes per record)',
      bandwidth: '~40KB/s write, ~4MB/s read'
    },

    high_level_design: {
      overview: 'Use REST API for URL creation and redirection. Store mappings in NoSQL database (Cassandra). Cache popular URLs in Redis. Use base62 encoding for short URLs.',
      components: [
        'Load Balancer',
        'Application Servers',
        'Database (Cassandra or DynamoDB)',
        'Cache (Redis)',
        'Key Generation Service'
      ],
      diagram_description: 'Client → Load Balancer → App Servers → Cache (Redis) → Database (Cassandra) + Key Generation Service'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Create Short URL',
          method: 'POST',
          endpoint: '/api/v1/shorten',
          params: ['long_url', 'custom_alias (optional)', 'expiration (optional)'],
          response: 'short_url'
        },
        {
          name: 'Redirect',
          method: 'GET',
          endpoint: '/{short_url}',
          response: '301/302 redirect to long_url'
        },
        {
          name: 'Get Analytics',
          method: 'GET',
          endpoint: '/api/v1/analytics/{short_url}',
          response: 'clicks, referrers, locations'
        }
      ],
      database_schema: [
        {
          table: 'url_mappings',
          fields: ['short_url (PK)', 'long_url', 'user_id', 'created_at', 'expiration_at', 'clicks'],
          indexes: ['user_id', 'created_at']
        },
        {
          table: 'analytics',
          fields: ['short_url', 'clicked_at', 'ip_address', 'user_agent', 'referrer']
        }
      ],
      key_algorithms: [
        {
          name: 'Base62 Encoding',
          description: 'Convert integer ID to base62 (a-z, A-Z, 0-9). 62^7 = 3.5 trillion unique URLs. Example: 12345 → "dnh"',
          complexity: 'O(log N)'
        },
        {
          name: 'MD5/SHA Hash + Base62',
          description: 'Hash long URL with MD5, take first 7 characters after base62 encoding. Risk: collisions (need to check and retry).',
          complexity: 'O(1) but collisions possible'
        },
        {
          name: 'Counter + Base62',
          description: 'Use auto-incrementing counter, convert to base62. No collisions. Need distributed counter (Zookeeper/Redis).',
          complexity: 'O(1) no collisions'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Key Generation Strategy',
        discussion: 'Best approach: Use auto-incrementing counter (stored in Redis or Zookeeper) and convert to base62. This guarantees unique keys with no collisions. Alternative: Pre-generate millions of keys and store in database. When creating short URL, grab unused key. This decouples key generation from URL creation.'
      },
      {
        topic: 'Handling Collisions',
        discussion: 'If using hashing: when collision detected, append counter and rehash. If using counter: no collisions possible. Use database unique constraint on short_url to prevent race conditions.'
      },
      {
        topic: 'Caching Strategy',
        discussion: 'Cache most popular URLs in Redis (80-20 rule: 20% of URLs get 80% of traffic). Use LRU eviction. Cache lookup: O(1). Cache hit rate: ~90%. This handles 90% of reads from cache, reducing database load significantly.'
      },
      {
        topic: 'Analytics and Rate Limiting',
        discussion: 'Track clicks asynchronously using message queue (Kafka). Write to analytics DB (Cassandra for time-series). Implement rate limiting per user/IP to prevent abuse. Use Redis for rate limiting counters.'
      }
    },

    trade_offs: [
      {
        decision: 'Short URL Generation',
        option_a: 'Hashing (MD5/SHA): Fast, but collisions possible. Need to handle retries.',
        option_b: 'Counter + Base62: Guaranteed unique, but need distributed counter (single point of failure).',
        recommendation: 'Use Counter + Base62 with multiple counter ranges assigned to different servers. More reliable.'
      },
      {
        decision: 'Redirect Type',
        option_a: '301 Permanent Redirect: Cached by browser, less server load, but no analytics on subsequent clicks',
        option_b: '302 Temporary Redirect: Not cached, more server load, but full analytics on all clicks',
        recommendation: 'Use 302 if analytics is important. Use 301 for lower latency if analytics not critical.'
      },
      {
        decision: 'Database Choice',
        option_a: 'SQL (PostgreSQL): ACID, but harder to scale',
        option_b: 'NoSQL (Cassandra/DynamoDB): Easy to scale, eventually consistent',
        recommendation: 'NoSQL (Cassandra) since we need high write throughput and reads are cacheable.'
      }
    ],

    follow_up_questions: [
      'How would you handle custom short URLs?',
      'How would you implement expiration?',
      'How would you prevent abuse?',
      'How would you implement A/B testing with short URLs?',
      'How would you handle deleted URLs?',
      'How would you implement QR codes for short URLs?',
      'How would you scale to billions of URLs?',
      'How would you implement link preview (showing metadata)?'
    ]
  },

  // ============================================
  // 3. DESIGN NETFLIX
  // ============================================
  {
    id: 'design-netflix',
    title: 'Design Netflix / Video Streaming Platform',
    difficulty: 'Hard',
    companies: ['Netflix', 'Amazon', 'Meta', 'Google', 'Uber'],
    estimated_time: '45-60 minutes',

    problem_statement: 'Design a video streaming platform like Netflix where users can browse, search, and watch movies/TV shows with adaptive bitrate streaming.',

    requirements: {
      functional: [
        'Users can browse and search videos',
        'Users can play, pause, resume videos',
        'Adaptive bitrate streaming (quality adjusts to bandwidth)',
        'Video uploads for content creators',
        'Recommendations based on watch history',
        'Continue watching from where you left off',
        'Support multiple devices'
      ],
      non_functional: [
        'Highly available (99.99% uptime)',
        'Low latency video start (<2 seconds)',
        'Handle millions of concurrent viewers',
        'Global CDN for content delivery',
        'High storage requirement (petabytes)'
      ]
    },

    capacity_estimation: {
      users: '200M subscribers, 100M daily active users',
      requests_per_day: '500M video views per day, avg watch time 2 hours',
      storage: '~10PB of video content (multiple bitrates, resolutions)',
      bandwidth: 'Massive: ~500GB/s during peak hours'
    },

    high_level_design: {
      overview: 'Use microservices with CDN for video delivery. Store videos in object storage (S3). Use adaptive bitrate streaming (HLS/DASH). Transcode videos to multiple bitrates. Use recommendation engine for personalization.',
      components: [
        'Client Apps (Web, Mobile, TV)',
        'API Gateway',
        'User Service',
        'Video Service',
        'Transcoding Service',
        'Recommendation Engine',
        'Search Service',
        'CDN (Cloudflare, Akamai)',
        'Object Storage (S3)',
        'Metadata Database (PostgreSQL)',
        'Cache (Redis)',
        'Analytics Pipeline (Kafka, Spark)'
      ],
      diagram_description: 'Client → CDN (video delivery) + API Gateway → Services → Database/Storage. Separate pipeline for video upload → Transcode → Store in S3 → Distribute to CDN'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Get Video Catalog',
          method: 'GET',
          endpoint: '/api/v1/videos',
          params: ['user_id', 'category', 'limit', 'offset'],
          response: 'videos[]'
        },
        {
          name: 'Get Video Stream URL',
          method: 'GET',
          endpoint: '/api/v1/videos/{video_id}/stream',
          params: ['user_id', 'quality'],
          response: 'stream_url (HLS/DASH manifest)'
        },
        {
          name: 'Update Watch Progress',
          method: 'POST',
          endpoint: '/api/v1/videos/{video_id}/progress',
          params: ['user_id', 'timestamp'],
          response: 'success'
        },
        {
          name: 'Upload Video',
          method: 'POST',
          endpoint: '/api/v1/videos/upload',
          params: ['title', 'description', 'video_file'],
          response: 'video_id, upload_status'
        }
      ],
      database_schema: [
        {
          table: 'videos',
          fields: ['video_id (PK)', 'title', 'description', 'duration', 'thumbnail_url', 'upload_date', 'views'],
          indexes: ['title', 'upload_date', 'views']
        },
        {
          table: 'video_files',
          fields: ['file_id (PK)', 'video_id (FK)', 'resolution', 'bitrate', 's3_url', 'size'],
          indexes: ['video_id']
        },
        {
          table: 'watch_history',
          fields: ['user_id', 'video_id', 'watched_at', 'progress', 'completed'],
          indexes: ['user_id', 'watched_at']
        },
        {
          table: 'users',
          fields: ['user_id (PK)', 'email', 'subscription_tier', 'preferences']
        }
      ],
      key_algorithms: [
        {
          name: 'Adaptive Bitrate Streaming (ABR)',
          description: 'Client measures bandwidth every few seconds and requests appropriate bitrate chunk. HLS: HTTP Live Streaming, segments video into chunks. DASH: similar standard.',
          complexity: 'N/A - protocol based'
        },
        {
          name: 'Video Transcoding Pipeline',
          description: 'Convert uploaded video to multiple resolutions (4K, 1080p, 720p, 480p, 360p) and bitrates. Use FFmpeg or cloud service (AWS MediaConvert). Can take hours for long videos.',
          complexity: 'O(video length)'
        },
        {
          name: 'Collaborative Filtering for Recommendations',
          description: 'Matrix factorization: find similar users, recommend what they watched. Netflix uses sophisticated ML models (reinforcement learning).',
          complexity: 'Training: expensive, Inference: fast'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Adaptive Bitrate Streaming',
        discussion: 'Video is split into small chunks (2-10 seconds). Each chunk available in multiple bitrates (360p, 720p, 1080p, 4K). Client downloads manifest file (playlist) with all available bitrates. Client measures download speed and selects appropriate bitrate for next chunk. If bandwidth drops, switch to lower quality. If improves, switch to higher quality. Provides smooth playback without buffering.'
      },
      {
        topic: 'CDN Strategy',
        discussion: 'Store video chunks in CDN edge servers worldwide. Use Open Connect (Netflix\'s CDN) or Cloudflare/Akamai. Edge servers cache popular content. When user requests video, route to nearest edge server. 90%+ of traffic served from CDN, not origin. Massive bandwidth savings. Origin is S3/object storage.'
      },
      {
        topic: 'Video Transcoding Pipeline',
        discussion: 'When video uploaded: 1) Store original in S3, 2) Add job to transcode queue (SQS), 3) Workers pick jobs and transcode to multiple formats (FFmpeg), 4) Upload transcoded files to S3, 5) Update database with file locations, 6) Distribute to CDN. Parallel processing: transcode different resolutions simultaneously. Can take 30 min - 3 hours depending on video length.'
      },
      {
        topic: 'Handling Peak Traffic',
        discussion: 'Peak traffic: Friday night when new shows release. Use CDN to absorb load. Pre-warm CDN by pushing popular content to edge servers before release. Use load balancing and auto-scaling for API servers. Rate limit API calls. Use circuit breakers to prevent cascading failures.'
      }
    ],

    trade_offs: [
      {
        decision: 'Video Storage',
        option_a: 'Store all bitrates: 5-10x storage cost, but instant playback at any quality',
        option_b: 'Transcode on-demand: lower storage, but delay when switching quality',
        recommendation: 'Store all bitrates. Storage is cheaper than poor user experience. Pre-transcode during upload.'
      },
      {
        decision: 'CDN vs Origin Serving',
        option_a: 'CDN: expensive but necessary for global low-latency delivery',
        option_b: 'Origin: cheaper but high latency for distant users',
        recommendation: 'Use CDN. Video streaming is impossible without CDN for global scale. 90%+ cost is bandwidth, optimize there.'
      },
      {
        decision: 'Live Streaming vs On-Demand',
        option_a: 'Live: more complex (real-time encoding, lower latency requirement <5s)',
        option_b: 'On-Demand: simpler (pre-encode, cache aggressively)',
        recommendation: 'Design for on-demand first. Live streaming requires different architecture (WebRTC, low-latency HLS).'
      }
    ],

    follow_up_questions: [
      'How would you implement live streaming?',
      'How would you handle video uploads from mobile with poor connectivity?',
      'How would you implement subtitles/captions?',
      'How would you detect and prevent piracy?',
      'How would you implement parental controls?',
      'How would you optimize for mobile data usage?',
      'How would you implement download for offline viewing?',
      'How would you A/B test video thumbnails?'
    ]
  },

  // ============================================
  // 4. DESIGN UBER
  // ============================================
  {
    id: 'design-uber',
    title: 'Design Uber / Ride-Sharing Platform',
    difficulty: 'Hard',
    companies: ['Uber', 'Lyft', 'Google', 'Amazon', 'Meta'],
    estimated_time: '45-60 minutes',

    problem_statement: 'Design a ride-sharing platform where riders can request rides and drivers can accept them. The system should match riders with nearby drivers efficiently.',

    requirements: {
      functional: [
        'Riders can request rides with pickup/dropoff locations',
        'System matches rider with nearby available driver',
        'Real-time location tracking of drivers',
        'ETA calculation',
        'Fare calculation',
        'Ride history',
        'Ratings for drivers and riders'
      ],
      non_functional: [
        'Low latency for matching (<1 second)',
        'Real-time updates (location, ride status)',
        'High availability',
        'Handle millions of rides per day',
        'Accurate ETA and fare'
      ]
    },

    capacity_estimation: {
      users: '100M users, 5M drivers, 10M daily rides',
      requests_per_day: '10M ride requests, 5M concurrent drivers sending location every 5 sec',
      storage: '~10TB for ride history per year',
      bandwidth: 'Location updates: ~5MB/s, Map data: ~500MB/s'
    },

    high_level_design: {
      overview: 'Use WebSocket for real-time communication. Geospatial indexing (QuadTree/Geohash) for driver matching. Message queue for ride requests. Microservices for riders, drivers, matching, payments.',
      components: [
        'WebSocket Server (location updates)',
        'Matching Service',
        'Location Service (QuadTree/Geohash)',
        'Routing Service (ETA calculation)',
        'Payment Service',
        'Notification Service',
        'Trip Service',
        'Database (PostgreSQL + Redis)',
        'Message Queue (Kafka)'
      ],
      diagram_description: 'Drivers/Riders ↔ WebSocket Server → Matching Service → Location Service (QuadTree) → Database + Message Queue'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Request Ride',
          method: 'POST',
          endpoint: '/api/v1/rides/request',
          params: ['rider_id', 'pickup_lat', 'pickup_lng', 'dropoff_lat', 'dropoff_lng'],
          response: 'ride_id, estimated_fare, estimated_wait'
        },
        {
          name: 'Update Driver Location',
          method: 'POST',
          endpoint: '/api/v1/drivers/location',
          params: ['driver_id', 'lat', 'lng', 'timestamp'],
          response: 'success'
        },
        {
          name: 'Accept Ride',
          method: 'POST',
          endpoint: '/api/v1/rides/{ride_id}/accept',
          params: ['driver_id'],
          response: 'rider_info, pickup_location'
        }
      ],
      database_schema: [
        {
          table: 'riders',
          fields: ['rider_id (PK)', 'name', 'phone', 'rating', 'payment_method']
        },
        {
          table: 'drivers',
          fields: ['driver_id (PK)', 'name', 'phone', 'car_model', 'license_plate', 'rating', 'is_available', 'current_lat', 'current_lng'],
          indexes: ['is_available']
        },
        {
          table: 'rides',
          fields: ['ride_id (PK)', 'rider_id', 'driver_id', 'status', 'pickup_lat', 'pickup_lng', 'dropoff_lat', 'dropoff_lng', 'fare', 'created_at', 'completed_at'],
          indexes: ['rider_id', 'driver_id', 'status', 'created_at']
        },
        {
          table: 'driver_locations (Redis)',
          fields: ['driver_id', 'lat', 'lng', 'last_updated', 'geohash']
        }
      ],
      key_algorithms: [
        {
          name: 'QuadTree for Driver Search',
          description: 'Partition map into quadrants recursively. Find drivers in same quadrant as rider. If not enough, expand search radius. Query: O(log N + K) where K = drivers in region.',
          complexity: 'O(log N + K)'
        },
        {
          name: 'Geohash',
          description: 'Encode (lat, lng) to string. Nearby locations have similar geohash prefixes. Index by geohash for fast proximity queries. Example: (37.7, -122.4) → "9q8yy"',
          complexity: 'O(1) encode, O(log N) query'
        },
        {
          name: 'Surge Pricing',
          description: 'Calculate demand/supply ratio in region. If demand > supply * threshold, apply multiplier (1.5x, 2x). Update every 5 minutes.',
          complexity: 'O(1)'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Driver Matching Algorithm',
        discussion: 'When rider requests ride: 1) Get rider location (lat, lng), 2) Query QuadTree/Geohash for drivers within 5km radius, 3) Filter available drivers, 4) Sort by distance and rating, 5) Send push notification to top 3 drivers, 6) First to accept gets ride, 7) Cancel notifications to others. Use Redis sorted set for drivers by geohash for fast queries.'
      },
      {
        topic: 'Real-time Location Updates',
        discussion: 'Drivers send location every 5 seconds via WebSocket. Store in Redis (in-memory, fast). Update QuadTree/Geohash index. When rider is in active ride, push driver location updates to rider via WebSocket. Use Redis pub/sub for real-time updates. Archive to Cassandra every 1 minute for historical tracking.'
      },
      {
        topic: 'ETA Calculation',
        discussion: 'Use routing service (Google Maps API, in-house service) to calculate: 1) Distance via road network, 2) Current traffic conditions, 3) Historical data for route at this time. Cache popular routes. Update ETA every 30 seconds during ride. Factor in: traffic lights, turn difficulty, road conditions.'
      },
      {
        topic: 'Handling High Load',
        discussion: 'Peak times (Friday 5pm, Saturday night): Pre-scale servers, increase WebSocket connections, use CDN for maps, enable surge pricing to reduce demand. Load balance by geographic region. Use separate clusters for different cities. Circuit breakers to prevent cascading failures.'
      }
    },

    trade_offs: [
      {
        decision: 'Matching Strategy',
        option_a: 'Broadcast to all nearby drivers: fair but creates notification spam',
        option_b: 'Send to closest driver first: efficient but may reject leading to delays',
        recommendation: 'Hybrid: Send to top 3 closest available drivers simultaneously. First to accept wins.'
      },
      {
        decision: 'Location Storage',
        option_a: 'Store every location update (5 sec intervals): detailed tracking but huge storage',
        option_b: 'Sample locations (e.g., every minute): reduced storage but less granularity',
        recommendation: 'Store in Redis (all updates), archive to Cassandra (sampled every minute) for long-term storage.'
      },
      {
        decision: 'ETA vs Actual Time',
        option_a: 'Conservative ETA: user waits less than expected (good UX) but may discourage requesting',
        option_b: 'Aggressive ETA: attracts riders but often late (bad UX)',
        recommendation: 'Add 10-15% buffer to calculated ETA. Better to understate than overpromise.'
      }
    ],

    follow_up_questions: [
      'How would you implement surge pricing?',
      'How would you handle lost connectivity?',
      'How would you implement ride sharing (UberPool)?',
      'How would you handle payment processing?',
      'How would you implement driver incentives?',
      'How would you detect fraud?',
      'How would you implement scheduled rides?',
      'How would you handle disputes?'
    ]
  },

  // ============================================
  // 5. DESIGN INSTAGRAM
  // ============================================
  {
    id: 'design-instagram',
    title: 'Design Instagram / Photo Sharing App',
    difficulty: 'Hard',
    companies: ['Meta', 'Google', 'Amazon', 'Snap', 'Pinterest'],
    estimated_time: '45-60 minutes',

    problem_statement: 'Design a photo-sharing social media platform where users can upload photos, follow others, like/comment on photos, and view a feed of photos from people they follow.',

    requirements: {
      functional: [
        'Users can upload photos with captions',
        'Users can follow/unfollow others',
        'Users can view feed of photos from followed users',
        'Users can like and comment on photos',
        'Users can view user profiles',
        'Photo discovery (explore page)'
      ],
      non_functional: [
        'Highly available',
        'Low latency for feed generation (<500ms)',
        'Eventually consistent is acceptable',
        'Handle billions of photos',
        'Scale to 1B users, 500M DAU'
      ]
    },

    capacity_estimation: {
      users: '1B users, 500M DAU',
      requests_per_day: '100M photos uploaded per day, 10B feed views per day',
      storage: '~50TB per day for photos (500KB avg), ~18PB per year',
      bandwidth: 'Upload: ~600MB/s, Download: ~6GB/s'
    },

    high_level_design: {
      overview: 'Similar to Twitter but image-focused. Use CDN for images. Object storage (S3) for photos. Fan-out on write for feed generation. Microservices architecture.',
      components: [
        'API Gateway',
        'Photo Service',
        'Feed Service',
        'User Service',
        'Social Graph Service',
        'Object Storage (S3)',
        'CDN (CloudFront)',
        'Database (Cassandra)',
        'Cache (Redis)',
        'Message Queue (Kafka)'
      ],
      diagram_description: 'Client → CDN (images) + API Gateway → Services → S3 (photos) + Cassandra (metadata) + Redis (cache)'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Upload Photo',
          method: 'POST',
          endpoint: '/api/v1/photos',
          params: ['user_id', 'image_file', 'caption', 'filters'],
          response: 'photo_id, image_url'
        },
        {
          name: 'Get Feed',
          method: 'GET',
          endpoint: '/api/v1/feed',
          params: ['user_id', 'cursor', 'limit'],
          response: 'photos[]'
        },
        {
          name: 'Like Photo',
          method: 'POST',
          endpoint: '/api/v1/photos/{photo_id}/like',
          params: ['user_id'],
          response: 'success'
        }
      ],
      database_schema: [
        {
          table: 'photos',
          fields: ['photo_id (PK)', 'user_id', 'caption', 's3_url', 'created_at', 'likes_count', 'comments_count'],
          indexes: ['user_id', 'created_at']
        },
        {
          table: 'feed_cache (Redis)',
          fields: ['user_id', 'photo_ids[] (sorted by timestamp)']
        },
        {
          table: 'likes',
          fields: ['user_id', 'photo_id', 'created_at'],
          indexes: ['photo_id', 'user_id']
        }
      ],
      key_algorithms: [
        {
          name: 'Image Processing Pipeline',
          description: 'Upload → Resize to multiple sizes (thumbnail, medium, full) → Compress → Upload to S3 → Distribute to CDN → Return URLs',
          complexity: 'O(image size)'
        },
        {
          name: 'Feed Ranking',
          description: 'Score = (likes * 2 + comments * 5) / (age_in_hours + 1). Recent and popular photos rank higher. Use ML for personalized ranking.',
          complexity: 'O(N log N) for sorting'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Image Storage and CDN',
        discussion: 'Store original in S3. Generate thumbnails (150x150), medium (640x640), large (1080x1080). Store all in S3. Push to CDN for fast global delivery. Use CDN for 90%+ of image serves. Image URLs: https://cdn.instagram.com/photos/{photo_id}/medium.jpg. Use image optimization (WebP, AVIF) for smaller sizes.'
      },
      {
        topic: 'Feed Generation',
        discussion: 'Use fan-out on write (similar to Twitter). When user uploads photo, push to all followers\' feed cache in Redis. For celebrities (>1M followers), use fan-out on read at request time. Hybrid approach. Cache feeds for 30 minutes. Algorithmic ranking: show most engaging content first, not just chronological.'
      },
      {
        topic: 'Explore Page',
        discussion: 'Show popular photos from users you don\'t follow. Algorithm: 1) Find photos with high engagement (likes/comments), 2) Filter out already seen, 3) Personalize based on your interests (ML model), 4) Cache results. Update every hour. Use Elasticsearch for photo search and discovery.'
      },
      {
        topic: 'Handling Celebrity Users',
        discussion: 'Users with millions of followers (like Ronaldo, Messi). Cannot fan-out to all followers - would take too long. Store their photos separately. When follower requests feed, fetch celebrity photos at read time and merge. Cache merged feeds aggressively.'
      }
    },

    trade_offs: [
      {
        decision: 'Image Quality vs Storage',
        option_a: 'Store high resolution: better quality but 10x storage cost',
        option_b: 'Compress aggressively: lower quality but cheaper',
        recommendation: 'Store multiple sizes. Original (high-res) for full screen, compressed for feed. Use modern formats (WebP, AVIF).'
      },
      {
        decision: 'Chronological vs Algorithmic Feed',
        option_a: 'Chronological: simple, transparent, but may miss best content',
        option_b: 'Algorithmic: shows engaging content but complex and may feel manipulative',
        recommendation: 'Hybrid: recent posts first, then ML-ranked older posts. Best of both worlds.'
      }
    ],

    follow_up_questions: [
      'How would you implement Stories?',
      'How would you implement direct messaging?',
      'How would you detect and remove inappropriate content?',
      'How would you implement hashtags?',
      'How would you implement location tagging?',
      'How would you prevent spam accounts?',
      'How would you implement filters and editing?',
      'How would you implement video (Reels)?'
    ]
  },

  // ============================================
  // 6. DESIGN WHATSAPP / MESSENGER
  // ============================================
  {
    id: 'design-whatsapp',
    title: 'Design WhatsApp / Messaging App',
    difficulty: 'Hard',
    companies: ['Meta', 'Google', 'Amazon', 'Microsoft', 'Snap'],
    estimated_time: '45-60 minutes',

    problem_statement: 'Design a real-time messaging application where users can send text messages, images, and videos to individuals and groups.',

    requirements: {
      functional: [
        'One-on-one messaging',
        'Group messaging',
        'Sent, delivered, read receipts',
        'Last seen status',
        'Media sharing (images, videos)',
        'End-to-end encryption',
        'Message history persistence'
      ],
      non_functional: [
        'Real-time message delivery',
        'High availability',
        'Low latency (<100ms)',
        'Strong consistency for messages',
        'Scale to 2B users, 100B messages per day'
      ]
    },

    capacity_estimation: {
      users: '2B users, 1B DAU',
      requests_per_day: '100B messages per day (~1M messages per second)',
      storage: '~50TB per day, ~18PB per year',
      bandwidth: 'Text: ~100MB/s, Media: ~10GB/s'
    },

    high_level_design: {
      overview: 'Use WebSocket for real-time bidirectional communication. Message queue for async delivery. NoSQL for message storage. CDN for media. End-to-end encryption.',
      components: [
        'WebSocket Server',
        'Chat Service',
        'Message Queue (Kafka)',
        'Message Store (Cassandra)',
        'User Service',
        'Media Service',
        'Presence Service',
        'Notification Service',
        'CDN for media'
      ],
      diagram_description: 'Client ↔ WebSocket Server → Chat Service → Message Queue → Message Store (Cassandra) + Media (S3/CDN)'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Send Message',
          method: 'WebSocket',
          endpoint: '/ws/chat',
          params: ['sender_id', 'recipient_id', 'message', 'timestamp', 'message_type'],
          response: 'message_id, status'
        },
        {
          name: 'Get Chat History',
          method: 'GET',
          endpoint: '/api/v1/chats/{chat_id}/messages',
          params: ['user_id', 'before_timestamp', 'limit'],
          response: 'messages[]'
        },
        {
          name: 'Upload Media',
          method: 'POST',
          endpoint: '/api/v1/media/upload',
          params: ['user_id', 'file', 'type'],
          response: 'media_url, media_id'
        }
      ],
      database_schema: [
        {
          table: 'messages',
          fields: ['message_id (PK)', 'chat_id', 'sender_id', 'content (encrypted)', 'timestamp', 'status', 'message_type'],
          indexes: ['chat_id, timestamp', 'sender_id']
        },
        {
          table: 'chats',
          fields: ['chat_id (PK)', 'type (one-on-one or group)', 'participants[]', 'created_at', 'last_message_at'],
          indexes: ['participants']
        },
        {
          table: 'user_connections (Redis)',
          fields: ['user_id', 'websocket_server', 'connection_id', 'last_seen']
        }
      ],
      key_algorithms: [
        {
          name: 'Message Delivery Protocol',
          description: '1) Client sends message via WebSocket, 2) Server persists to DB, 3) If recipient online, push via WebSocket, 4) If offline, queue for later, 5) Send push notification, 6) Acknowledge delivery',
          complexity: 'O(1)'
        },
        {
          name: 'End-to-End Encryption (Signal Protocol)',
          description: 'Messages encrypted on sender device, decrypted on recipient device. Server cannot read content. Use public-key cryptography.',
          complexity: 'Encryption: O(message size)'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Real-time Message Delivery',
        discussion: 'Use WebSocket for persistent bidirectional connection. When user sends message: 1) Client → WebSocket Server, 2) Server persists to Cassandra, 3) Server checks if recipient online (Redis lookup), 4) If online, push via their WebSocket, 5) If offline, add to message queue for later delivery, 6) Send push notification. Acknowledgments: client sends ack when message received/read.'
      },
      {
        topic: 'Handling Offline Users',
        discussion: 'Messages stored in Cassandra. When user comes online: 1) Client connects via WebSocket, 2) Server queries undelivered messages from DB, 3) Push all pending messages, 4) Mark as delivered. Use pagination for large backlog. Messages stored for 30 days (configurable). Push notifications sent for important messages.'
      },
      {
        topic: 'Group Messaging',
        discussion: 'Group has admin(s) and members. When message sent to group: 1) Fan out to all members, 2) For online members, push via WebSocket, 3) For offline, queue. Optimization: if group >256 members, use message queue to fan out asynchronously. Store one copy of message, reference from each recipient\'s inbox.'
      },
      {
        topic: 'Last Seen and Presence',
        discussion: 'Track user connection state in Redis. When user connects, mark online. Heartbeat every 30 seconds to maintain online status. When disconnect or timeout, mark last_seen timestamp. Privacy: users can hide last seen. Use pub/sub to notify contacts when user comes online/offline.'
      }
    },

    trade_offs: [
      {
        decision: 'Message Ordering',
        option_a: 'Server timestamp: consistent but may reorder messages sent simultaneously',
        option_b: 'Client timestamp: preserves send order but can be spoofed',
        recommendation: 'Use server timestamp but apply small offset based on client timestamp for very close messages. Best UX.'
      },
      {
        decision: 'Message Storage',
        option_a: 'Store all messages forever: good UX but expensive',
        option_b: 'Delete after 30/90 days: cheaper but users lose history',
        recommendation: 'Store on server for 30 days, offer backup/export. Local device stores longer.'
      },
      {
        decision: 'Read Receipts',
        option_a: 'Always on: sender knows when message read, but recipient loses privacy',
        option_b: 'Opt-in: respects privacy but less engagement',
        recommendation: 'Default on with option to disable. Most users prefer transparency.'
      }
    ],

    follow_up_questions: [
      'How would you implement end-to-end encryption?',
      'How would you handle message editing/deletion?',
      'How would you implement voice/video calls?',
      'How would you implement message search?',
      'How would you handle large group chats (>1000 members)?',
      'How would you implement stories?',
      'How would you prevent spam?',
      'How would you implement message reactions?'
    ]
  },

  // ============================================
  // 7. DESIGN RATE LIMITER
  // ============================================
  {
    id: 'design-rate-limiter',
    title: 'Design Rate Limiter / API Throttling',
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Stripe', 'Uber'],
    estimated_time: '30-45 minutes',

    problem_statement: 'Design a rate limiter that restricts the number of requests a user/client can make to an API within a time window.',

    requirements: {
      functional: [
        'Limit requests per user per time window',
        'Support multiple time windows (per second, minute, hour, day)',
        'Return clear error when limit exceeded',
        'Support different limits for different users/tiers',
        'Distributed system (multiple servers)'
      ],
      non_functional: [
        'Low latency (<10ms overhead)',
        'Accurate counting',
        'Fault tolerant',
        'Handle millions of requests per second'
      ]
    },

    capacity_estimation: {
      users: '1M users making API calls',
      requests_per_day: '10B API requests per day (~100K requests/sec)',
      storage: 'Minimal: counters in Redis',
      bandwidth: 'Negligible'
    },

    high_level_design: {
      overview: 'Use Redis for distributed counting. Implement token bucket or sliding window algorithm. Middleware intercepts requests before reaching API.',
      components: [
        'API Gateway / Middleware',
        'Rate Limiter Service',
        'Redis (counter storage)',
        'Rules Engine (define limits)',
        'Monitoring & Alerts'
      ],
      diagram_description: 'Client → API Gateway → Rate Limiter (check Redis) → API Server'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Check Rate Limit',
          method: 'Internal',
          endpoint: 'N/A (middleware)',
          params: ['user_id', 'endpoint', 'timestamp'],
          response: 'allowed: boolean, remaining: number, reset_time'
        }
      ],
      database_schema: [
        {
          table: 'rate_limit_counters (Redis)',
          fields: ['key (user_id:endpoint:window)', 'count', 'ttl (expiration)']
        },
        {
          table: 'rate_limit_rules',
          fields: ['rule_id', 'endpoint', 'user_tier', 'max_requests', 'window_seconds'],
          indexes: ['endpoint, user_tier']
        }
      ],
      key_algorithms: [
        {
          name: 'Token Bucket',
          description: 'Bucket has max tokens (capacity). Tokens added at fixed rate. Each request consumes 1 token. If no tokens, reject. Simple and efficient.',
          complexity: 'O(1)'
        },
        {
          name: 'Sliding Window Log',
          description: 'Store timestamp of each request in sorted set. Count requests in last N seconds. Remove old entries. Accurate but memory intensive.',
          complexity: 'O(log N) per request'
        },
        {
          name: 'Sliding Window Counter (Hybrid)',
          description: 'Combine fixed window counters with weighted average. Estimate current window count. Memory efficient and fairly accurate.',
          complexity: 'O(1)'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Token Bucket Algorithm Implementation',
        discussion: 'Each user has bucket with max tokens (e.g., 100). Tokens refill at rate (e.g., 10/second). On request: 1) Check tokens available, 2) If > 0, decrement and allow, 3) If = 0, reject with 429 status. Redis: store (tokens, last_refill_time). Calculate tokens to add since last refill. Update atomically using Redis Lua script for consistency.'
      },
      {
        topic: 'Distributed Rate Limiting',
        discussion: 'Challenge: multiple API servers need shared state. Solution: Use Redis as centralized counter. All servers check/update Redis. Use Redis INCR (atomic). Alternative: Each server maintains local counter (eventually consistent). Sync periodically. Trade-off: accuracy vs latency. Centralized Redis: accurate but network hop. Local: faster but can exceed limit briefly.'
      },
      {
        topic: 'Handling Bursts',
        discussion: 'Token bucket naturally handles bursts - can use up to max capacity instantly. Fixed window has problem: 200 requests at end of window 1 + 200 at start of window 2 = 400 in 2 seconds (but limit is 200/sec). Sliding window solves this by looking at rolling window.'
      },
      {
        topic: 'Rate Limit Headers',
        discussion: 'Return headers in API response: X-RateLimit-Limit: 1000, X-RateLimit-Remaining: 842, X-RateLimit-Reset: 1640000000 (Unix timestamp). When exceeded: 429 Too Many Requests, Retry-After: 60 (seconds). Helps clients implement exponential backoff.'
      }
    },

    trade_offs: [
      {
        decision: 'Algorithm Choice',
        option_a: 'Token Bucket: simple, handles bursts, memory efficient',
        option_b: 'Sliding Window Log: accurate but memory intensive',
        recommendation: 'Token Bucket for most cases. Sliding Window if need strict accuracy (e.g., billing APIs).'
      },
      {
        decision: 'Centralized vs Distributed Counters',
        option_a: 'Centralized (Redis): accurate but single point of failure and network latency',
        option_b: 'Distributed (local counters): fast but can exceed limit',
        recommendation: 'Hybrid: Use Redis with local cache. Refresh cache every few seconds. 99% accurate, much faster.'
      },
      {
        decision: 'Hard vs Soft Limits',
        option_a: 'Hard limit: strictly enforce, reject immediately',
        option_b: 'Soft limit: allow brief exceedance, queue requests',
        recommendation: 'Hard limit for abuse prevention. Soft limit for legitimate users (better UX).'
      }
    ],

    follow_up_questions: [
      'How would you implement different limits for different user tiers?',
      'How would you handle rate limiting in a globally distributed system?',
      'How would you implement rate limiting by IP address?',
      'How would you prevent distributed denial of service (DDoS)?',
      'How would you implement dynamic rate limiting based on server load?',
      'How would you handle clock synchronization issues?',
      'How would you monitor and alert on rate limit violations?',
      'How would you implement whitelisting/blacklisting?'
    ]
  },

  // ============================================
  // 8. DESIGN NOTIFICATION SYSTEM
  // ============================================
  {
    id: 'design-notification-system',
    title: 'Design Notification / Push Notification System',
    difficulty: 'Medium',
    companies: ['Meta', 'Google', 'Amazon', 'Apple', 'Uber'],
    estimated_time: '30-45 minutes',

    problem_statement: 'Design a notification system that can send push notifications, emails, and SMS to users based on events in the application.',

    requirements: {
      functional: [
        'Send push notifications to mobile devices',
        'Send emails',
        'Send SMS',
        'Support notification preferences (opt-in/out)',
        'Support notification templates',
        'Priority levels (urgent vs normal)',
        'Delivery tracking and analytics'
      ],
      non_functional: [
        'High throughput (millions of notifications per day)',
        'Reliable delivery (at-least-once)',
        'Low latency for urgent notifications (<1 second)',
        'Scalable',
        'Support multiple notification channels'
      ]
    },

    capacity_estimation: {
      users: '100M users',
      requests_per_day: '1B notifications per day (~10K notifications/sec)',
      storage: '~100GB per day for logs',
      bandwidth: '~10MB/s'
    },

    high_level_design: {
      overview: 'Use message queue to decouple producers from consumers. Workers pull from queue and send via appropriate channel (APNs, FCM, Email, SMS). Track delivery status.',
      components: [
        'Notification API',
        'Message Queue (Kafka)',
        'Notification Workers',
        'APNs (iOS push)',
        'FCM (Android push)',
        'Email Service (SendGrid)',
        'SMS Service (Twilio)',
        'User Preferences Service',
        'Template Service',
        'Analytics Service',
        'Database (PostgreSQL + Cassandra)'
      ],
      diagram_description: 'Event Source → Notification API → Message Queue (Kafka) → Workers → APNs/FCM/Email/SMS → Devices + Analytics Store'
    },

    detailed_design: {
      api_design: [
        {
          name: 'Send Notification',
          method: 'POST',
          endpoint: '/api/v1/notifications/send',
          params: ['user_ids[]', 'template_id', 'data', 'priority', 'channels[]'],
          response: 'notification_ids[]'
        },
        {
          name: 'Update Preferences',
          method: 'PUT',
          endpoint: '/api/v1/users/{user_id}/preferences',
          params: ['channels', 'categories', 'enabled'],
          response: 'success'
        },
        {
          name: 'Get Delivery Status',
          method: 'GET',
          endpoint: '/api/v1/notifications/{notification_id}/status',
          response: 'status, delivered_at, opened_at'
        }
      ],
      database_schema: [
        {
          table: 'notifications',
          fields: ['notification_id (PK)', 'user_id', 'template_id', 'data', 'status', 'created_at', 'sent_at', 'delivered_at', 'opened_at'],
          indexes: ['user_id', 'status', 'created_at']
        },
        {
          table: 'user_preferences',
          fields: ['user_id (PK)', 'push_enabled', 'email_enabled', 'sms_enabled', 'categories_enabled[]', 'quiet_hours'],
          indexes: ['user_id']
        },
        {
          table: 'templates',
          fields: ['template_id (PK)', 'name', 'push_template', 'email_template', 'sms_template', 'category'],
          indexes: ['category']
        }
      ],
      key_algorithms: [
        {
          name: 'Fan-out Notifications',
          description: 'For notifications to multiple users, add one job per user to queue. Workers process in parallel. For millions of users, batch in chunks of 1000.',
          complexity: 'O(N) where N = users'
        },
        {
          name: 'Priority Queue',
          description: 'Use separate Kafka topics for urgent vs normal notifications. Urgent processed first. More workers assigned to urgent topic.',
          complexity: 'O(1)'
        },
        {
          name: 'Rate Limiting per User',
          description: 'Prevent notification spam. Max 10 notifications per hour per user. Use token bucket. Check before sending.',
          complexity: 'O(1)'
        }
      ]
    },

    deep_dive_topics: [
      {
        topic: 'Notification Delivery Flow',
        discussion: 'Event occurs (e.g., someone likes your post) → 1) Service calls Notification API, 2) API checks user preferences (opted in?), 3) Render template with data, 4) Add job to Kafka queue, 5) Worker picks job, 6) Determine channels (push/email/SMS), 7) Send via appropriate service (APNs for iOS, FCM for Android, SendGrid for email), 8) Track delivery status, 9) Handle failures with retry (exponential backoff)'
      },
      {
        topic: 'Handling Different Channels',
        discussion: 'Each channel (push, email, SMS) has different API. Push: Use APNs for iOS, FCM for Android. Send device token + message. Email: SMTP via SendGrid/AWS SES. SMS: Twilio API. Each has different delivery guarantees, latency, cost. Push: instant, free. Email: seconds, cheap. SMS: instant, expensive. Priority: critical alerts via SMS, social notifications via push.'
      },
      {
        topic: 'Reliability and Retries',
        discussion: 'Notification delivery can fail (device offline, network issues, rate limits). Store in database with status. Workers retry failed notifications with exponential backoff (1s, 2s, 4s, 8s, 16s, give up after 5 attempts). For critical notifications (security alerts), retry more aggressively. Use dead-letter queue for failed notifications after max retries.'
      },
      {
        topic: 'User Preferences and Quiet Hours',
        discussion: 'Users can disable notifications by category (comments, likes, mentions). Respect quiet hours (e.g., 10pm-8am, no notifications). Store preferences in database. Check before sending. Exception: critical security alerts always sent. Allow fine-grained control: push yes, email no. Per-app settings.'
      }
    },

    trade_offs: [
      {
        decision: 'Synchronous vs Asynchronous',
        option_a: 'Synchronous: send immediately in API call. Simple but slow, blocks caller',
        option_b: 'Asynchronous: queue for later. Fast API response but more complex',
        recommendation: 'Asynchronous with message queue. Non-blocking, scalable, reliable. Use Kafka for durability.'
      },
      {
        decision: 'Notification Deduplication',
        option_a: 'Send every notification: may spam users with duplicates',
        option_b: 'Deduplicate: if similar notification sent recently, skip. Better UX but complex',
        recommendation: 'Deduplicate for social notifications (e.g., "X and 10 others liked your post"). Don\'t deduplicate for critical alerts.'
      },
      {
        decision: 'Storage Duration',
        option_a: 'Store all notifications forever: good for analytics but expensive',
        option_b: 'Delete after 90 days: cheaper but lose history',
        recommendation: 'Store recent (90 days) in hot storage (PostgreSQL). Archive to cold storage (S3) for long-term analytics.'
      }
    ],

    follow_up_questions: [
      'How would you implement notification grouping (e.g., "X and 5 others")?',
      'How would you handle users with multiple devices?',
      'How would you implement notification scheduling (send at specific time)?',
      'How would you track notification open rates?',
      'How would you implement A/B testing for notifications?',
      'How would you handle notification localization (multiple languages)?',
      'How would you prevent notification fatigue?',
      'How would you implement rich notifications (images, actions)?'
    ]
  }

  // Additional problems can be added: Google Drive, Web Crawler, YouTube, Parking Lot, Typeahead, News Feed, Distributed Cache
  // The above 8 problems provide a strong foundation for interview preparation
];

/**
 * Get problem by ID
 */
export function getSystemDesignProblem(problemId: string): SystemDesignProblem | undefined {
  return SYSTEM_DESIGN_PROBLEMS.find(p => p.id === problemId);
}

/**
 * Get problems by difficulty
 */
export function getSystemDesignProblemsByDifficulty(difficulty: 'Medium' | 'Hard'): SystemDesignProblem[] {
  return SYSTEM_DESIGN_PROBLEMS.filter(p => p.difficulty === difficulty);
}

/**
 * Get problems by company
 */
export function getSystemDesignProblemsByCompany(company: string): SystemDesignProblem[] {
  return SYSTEM_DESIGN_PROBLEMS.filter(p =>
    p.companies.some(c => c.toLowerCase() === company.toLowerCase())
  );
}

/**
 * Get all problem titles for quick reference
 */
export function getAllSystemDesignProblems(): { id: string; title: string; difficulty: string }[] {
  return SYSTEM_DESIGN_PROBLEMS.map(p => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty
  }));
}
