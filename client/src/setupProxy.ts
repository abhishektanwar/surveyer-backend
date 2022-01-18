import { createProxyMiddleware } from 'http-proxy-middleware'

const proxyMiddleware = (app: any) => {
  app.use(["/api", "/auth/google"], createProxyMiddleware({ target: "http://localhost:5000", }))
}

export default proxyMiddleware;