const request = require('supertest');
const app = require('../app');

let id;

test('GET /albums', async () => {
    const res = await request(app).get('/albums');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /albums', async () => {
    const album = {
        name: "Apetite for destruction",
        releaseYear: 1985,
        image: 'https://image.jpg',
    }
    const res = await request(app).post('/albums').send(album);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(album.name);
    expect(res.body.id).toBeDefined();
});

test('PUT /albums/:id', async () => {
    const album = {
        name: "Apetite for destruction",
    }
    const res = await request(app).put(`/albums/${id}`).send(album);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(album.name);
});

test('DELETE /albums/:id', async () => {
    const res = await request(app).delete(`/albums/${id}`);
    expect(res.status).toBe(204);
});
