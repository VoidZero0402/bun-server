import data from './data.json';

const server = Bun.serve({
	port: 4000,
	hostname: 'localhost',
	routes: {
		'/api/models': {
			GET: () => {
				return Response.json(data.models);
			},
		},
		'/api/models/:id': {
			GET: (request) => {
				const model = data.models.find((model) => model.id === request.params.id);
				return Response.json(model);
			},
		},
		'/api/activities/recent': {
			GET: () => {
				return Response.json(data.activities);
			},
		},
		'/static/*': {
			GET: (request) => {
				const url = new URL(request.url);
				const file = Bun.file(`.${url.pathname}`);
				if (file.size > 0) return new Response(file);
				return new Response('Not Found Any File', { status: 404 });
			},
		},
	},
});

console.log(`🚀 Server started on http://${server.hostname}:${server.port}`);
