import {it ,test, beforeAll, afterAll, expect, describe, beforeEach} from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('routes', () => {
    beforeAll( async () => {
        await app.ready()
    })
    
    afterAll( async () => {
        await app.close()
    })

    // beforeEach(() => {
    //     execSync('npm run knex migrate:rollback --all')
    //     execSync('npm run knex migrate:latest')
    // })
    
    it('should be able to create a user', async () => {
        const numeroAleatorio = Math.floor(Math.random() * 1000); // Gere um número aleatório de 0 a 999
        const email = `Ricardo${numeroAleatorio}@gmail.com`;

        await request(app.server).post('/users')
        .send({
            email,
            name: "Ricardo Rian",
            avatar_url: "https://avatars.githubusercontent.com/u/121899636?v=4",
        })
        .expect("Usuário criado")
        .expect(201)
    })

    it('should be able to list the users', async () => {
        await request(app.server).get('/users').expect(201)
    })
    
    it('should be able to insert meal', async () => {
        await request(app.server).post('/meals')
        .send({
            user_email: "ricardo@gmail.com",
            nameMeal: "Carne de Avestruz Africano",
            description: "Cocha de Avestruz assada com brócolis",
            OnADiet: "No",
            Hour: "12:15"
        })
        .expect('Dados Enviados!')
        .expect(201)
    })

})

