import fastify from "fastify";
import { knex } from "./database";
import { z } from "zod";

const app = fastify()

//USERS
app.get('/users', async (request,reply) => {
    const user = await knex('users').select('*')
    return user
})

app.post('/users', async (request,reply) => {
    const getParamsSchema = z.object({
        email: z.string(),
        name: z.string(),
        avatar_url: z.string()
      })

    const { email ,name, avatar_url} = getParamsSchema.parse(request.body)

    await knex('users').insert({
        email,
        name,
        avatar_url
    })
    return reply.status(201).send("Usuário criado")    
})


//MEALS
//Listar todas as refeições cadastradas no banco de dados
app.get('/meals', async (request,reply) => {
    const meals = await knex('meals').select('*')
    return meals
})

//Cadastrar uma refeição
app.post('/meals', async (request,reply) => {
    await knex('meals').insert(request.body)
    return reply.status(201).send('Dados Enviados!')
})

//Listar as refeições por usuário.
app.get('/meals/:user_email', async (request, reply) => {
    const getParamsSchema = z.object({
        user_email: z.string(),
      })

    const { user_email } = getParamsSchema.parse(request.params)
    
    const allMeals = await knex('meals').where({user_email,}).select('*')

    return allMeals
})

//Editar uma refeição
app.put('/meals/:user_email/:name_Meal', async (request,reply) => {
    const getParamsSchema = z.object({
        user_email: z.string(),
        name_Meal: z.string(),
      })

      const getBodySchema = z.object({
        nameMeal: z.string(),
        description: z.string(),
        OnADiet: z.string(),
        Hour: z.string()
      })

    const { user_email, name_Meal } = getParamsSchema.parse(request.params)
    const { nameMeal,description,OnADiet,Hour } = getBodySchema.parse(request.body)


    await knex('meals').update({nameMeal,description,OnADiet,Hour}).where({
        user_email,
        nameMeal: name_Meal
    })

    return reply.status(201).send("Alterações Concluídas")
})

//Deletar uma refeição
app.delete('/meals/:user_email/:name_Meal', async (request,reply) => {
    const getParamsSchema = z.object({
        user_email: z.string(),
        name_Meal: z.string(),
      })

    const { user_email, name_Meal } = getParamsSchema.parse(request.params)


    await knex('meals').del().where({
        user_email,
        nameMeal: name_Meal
    })

    return reply.status(201).send("Refeição deletada")
})

//Visualizar uma única refeição
app.get('/meals/:user_email/:name_Meal', async (request,reply) => {
    const getParamsSchema = z.object({
        user_email: z.string(),
        name_Meal: z.string(),
      })

    const { user_email, name_Meal } = getParamsSchema.parse(request.params)


    const meal = await knex('meals').where({
        user_email,
        nameMeal: name_Meal
    }).first()

    return meal
})



app.listen({
    port: 3333,
}).then(()=>{
    console.log('O servidor está rodando!')
})