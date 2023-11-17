const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /artists', async () => {
    const res = await request(app).get('/artists');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /artists', async () => {
    const artist = {
        name: 'Guns n Roses',
        country: 'USA',
        formationYear: 1980,
        image: 'https://gunsnroses.jpg'
    }
    const res = await request(app).post('/artists').send(artist);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(artist.name);
});

test('PUT /artists/:id', async () => {
    const artist = {
        name: 'Guns n Roses updated',
    }
    const res = await request(app).put('/artists/'+id).send(artist);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(artist.name);
});

test('POST /artists/:id/genres', async () => {
    const genre = await Genre.create({ name: "Pop" });
    const res = await request(app)
        .post(`/artists/${id}/genres`)
        .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE /artists/:id', async () => {
    const res = await request(app).delete('/artists/'+id);
    expect(res.status).toBe(204);
});

