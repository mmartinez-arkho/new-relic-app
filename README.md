# NestJS New Relic Integration

A demonstration project showcasing comprehensive integration between NestJS and New Relic APM, with a focus on complete monitoring, logging, and error tracking capabilities.

## 📋 Overview

This project demonstrates best practices for integrating New Relic monitoring with a NestJS application. It includes:

- Custom logging service with New Relic integration
- Request tracking middleware
- Transaction and segment instrumentation
- Error monitoring and reporting
- Complete API with GET and POST endpoints for testing

By following this example, you can ensure your NestJS applications have comprehensive observability through New Relic's APM platform.

## ✨ Features

- **Custom Logger Integration**: Sends all application logs to New Relic
- **HTTP Request Tracking**: Measures and records all API calls
- **Error Monitoring**: Captures and reports detailed error information
- **Performance Metrics**: Records custom metrics for application performance
- **Transaction Tracing**: Provides detailed traces of application execution
- **RESTful API**: Simple item management API for demonstration

## 🔧 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A New Relic account and license key
- Postman (for testing the API)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nestjs-newrelic-demo.git
   cd nestjs-newrelic-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure New Relic:
   - Open the `newrelic.js` file in the root directory
   - Replace `'your_license_key_here'` with your actual New Relic license key
   - Update the `app_name` if desired

## ⚙️ Configuration

### New Relic Configuration

You have to create `newrelic.js` on root using the `newrelic_example.js` file that contains the New Relic agent configuration:

```javascript
exports.config = {
  app_name: ['NestJS New Relic Demo'],  // Set your application name
  license_key: 'your_license_key_here', // Replace with your actual license key
  distributed_tracing: {
    enabled: true                       // Enable distributed tracing
  },
  logging: {
    level: 'info'                      // Logging level (use 'trace' for debugging)
  }
  // Other configuration options...
}
```

## 🏃‍♂️ Running the Application

Start the application in development mode:

```bash
npm run start:dev
```

The application will be available at `http://localhost:3000`.

## 🧪 Testing with Postman

A Postman collection is provided to test the API endpoints. Import the collection from the `postman` directory or use the following endpoints:

### 1. Get All Items
- **Method**: GET
- **URL**: `http://localhost:3000/items`

### 2. Get Item by ID
- **Method**: GET
- **URL**: `http://localhost:3000/items/1`

### 3. Create Item
- **Method**: POST
- **URL**: `http://localhost:3000/items`
- **Body**: 
  ```json
  {
    "name": "Sample Item",
    "description": "This is a sample item for testing"
  }
  ```

### 4. Generate Test Error
- **Method**: GET
- **URL**: `http://localhost:3000/items/test/error`

## 📁 Project Structure

```
nestjs-newrelic-demo/
├── src/
│   ├── app.controller.ts          # Default application controller
│   ├── app.module.ts              # Main application module
│   ├── app.service.ts             # Default application service
│   ├── main.ts                    # Application entry point with New Relic initialization
│   ├── items/                     # Feature module for item management
│   │   └── items.controller.ts    # Controller with GET/POST endpoints and error test
│   ├── logger/                    # Custom logging module
│   │   ├── logger.module.ts       # Module configuration for logger
│   │   └── logger.service.ts      # Service that integrates with New Relic logging
│   ├── middleware/
│   │   └── newrelic.middleware.ts # Middleware that tracks HTTP requests
├── newrelic.js                    # New Relic configuration file
├── package.json                   # Project dependencies and scripts
└── README.md                      # Project documentation
```

## 📊 Viewing Data in New Relic

After running your application and making some requests, you can view the data in the New Relic UI:

1. Log in to your New Relic account
2. Navigate to APM > Applications
3. Select your application (named as specified in `newrelic.js`)

You'll be able to see:
- Application performance metrics
- Transaction traces
- Error reports
- Logs from your application
- Custom metrics and attributes

## ⚠️ Troubleshooting

### Logs Not Appearing in New Relic
- Verify your license key is correct
- Check that `require('newrelic')` is the first line in `main.ts`
- Ensure your application can connect to New Relic's servers

### Missing Transaction Data
- Verify that segments and transactions are properly created and ended
- Check for any errors in the New Relic agent logs

### Error Monitoring Issues
- Ensure errors are properly caught and reported using `noticeError()`
- Verify error objects have the required properties

## 🔍 How It Works

### 1. New Relic Initialization
New Relic is initialized first in `main.ts`:
```typescript
// This must be the first line of code
require('newrelic');

// Rest of the application bootstrap
```

### 2. Custom Logger
The `LoggerService` integrates with New Relic's logging system:
```typescript
// Send log to New Relic
newrelic.recordLogEvent({
  message: messageWithContext,
  level: 'info',
  timestamp: Date.now(),
});
```

### 3. Request Tracking
The `NewRelicMiddleware` tracks all HTTP requests:
```typescript
// Add custom attributes to New Relic
newrelic.addCustomAttributes({
  requestMethod: req.method,
  requestPath: req.path,
  responseStatus: res.statusCode,
  responseTime: duration,
});
```

### 4. Transaction and Segment Tracking
Controller methods use New Relic's transaction tracking:
```typescript
// Track a specific segment of code
return newrelic.startSegment('getAllItems', true, () => {
  // Code to measure...
});
```

## 🧩 Extending the Project

Ideas for extending this project:
- Add more endpoints and features
- Implement custom dashboards in New Relic
- Add database monitoring
- Set up alerting based on error rates or response times
- Implement distributed tracing across multiple services

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙋‍♂️ Support

If you have any questions or need help with this project, please open an issue in the GitHub repository or contact the maintainers directly.

Happy monitoring! 📈