const mysql = require('mysql2/promise');
const supertest = require('supertest')
const app = require('../src/index.js')
const asert = require ('asert')

const api = supertest(app)

test('movies are returned as json', async () => {
  await api
    .get('/movies')
    .expect(200)
    .expect('Content-Type', /json/)
}, 1000000)

test ("comprobar que devuelve array de peliculas", async ()=> {
  await api 
    .get('/movies')
    .expect(200)
    .expect('Content-Type', 'application/json')
})