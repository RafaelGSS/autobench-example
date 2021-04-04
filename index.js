const Fastify = require('fastify')
const fastify = Fastify({ logger: process.env.NODE_ENV === 'development' })

process.on('SIGTERM', () => {
  fastify.close()
  process.exit(0)
})

async function slowPromise() {
  const rand = 5000
  await new Promise((resolve) => setTimeout(resolve, rand))
  return true
}

fastify.get('/', (req, reply) => {
  reply.send({ ok: true })
})

fastify.get('/slow', async (req, reply) => {
  const result = await slowPromise()
  return { ok: result }
})

fastify.listen(3000, '0.0.0.0', (err) => {
  if (err) throw err
})
