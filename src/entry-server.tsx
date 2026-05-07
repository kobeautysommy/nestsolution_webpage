import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { routeDefs } from './app/routes';

export { SEO_MAP } from './app/routes';

export async function render(url: string): Promise<string> {
  const handler = createStaticHandler(routeDefs);
  const request = new Request(`https://nestsolution.co.kr${url}`);
  const context = await handler.query(request);

  if (context instanceof Response) throw context;

  const router = createStaticRouter(handler.dataRoutes, context);

  return renderToString(
    <StaticRouterProvider router={router} context={context} />
  );
}
