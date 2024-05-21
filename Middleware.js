const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey && apiKey === process.env.API_KEY) {
      next(); // إذا كانت API Key صحيحة، تابع الطلب
    } else {
      res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
    }
  };
  
  // تطبيق Middleware على جميع المسارات
  app.use(apiKeyMiddleware);
  