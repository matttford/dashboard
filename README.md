# Dashboard

A serverless web application that displays a continuous stream of memes from an S3 bucket.

## Structure

This is a monorepo using npm workspaces:

- `lambda/` - Lambda backend with router pattern
- `frontend/` - React frontend with Vite

## Lambda Backend

The Lambda follows a router pattern similar to `wordpress-services`:

- `src/entrypoints/lambda/` - Lambda handler and event unwrapping
- `src/app/` - Router and handlers
- `src/infra/integrations/aws/` - AWS SDK integrations

### Adding a New Handler

1. Create handler function in `src/app/handlers/`
2. Add request type constant in `src/app/index.ts`
3. Add entry to `typeRoutes` map in `src/app/index.ts`

Example:
```typescript
// src/app/handlers/getRandomMemeByCategory.ts
export const getRandomMemeByCategory = async (category: string) => {
  // Handler logic
};

// src/app/index.ts
const GetRandomMemeByCategory = "GetRandomMemeByCategory" as const;

const typeRoutes = {
  [GetRandomMeme]: getRandomMeme,
  [GetRandomMemeByCategory]: getRandomMemeByCategory,
} as const;
```

## Frontend

React app that:
- Fetches memes from Lambda Function URL
- Displays images with loading states
- Auto-refreshes every 10 seconds

## Development

### Lambda

```bash
cd lambda
npm install
npm run build
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set `VITE_API_URL` environment variable to your Lambda Function URL.

## Deployment

The infrastructure is defined in `showit-infrastructure` and includes:
- MemeBucket (private S3 bucket)
- SiteBucket (public S3 bucket for frontend)
- Lambda function with Function URL
- CloudFront distribution
- BucketDeployment for frontend

