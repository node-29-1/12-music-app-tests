const request = require('supertest');
const app = require('../app');

let id;

test('GET /songs', async () => {
    const res = await request(app).get('/songs');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /songs', async() => {
    const song = {
        name: "Sweet child o mine",
    }
    const res = await request(app).post('/songs').send(song);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(song.name);
    expect(res.body.id).toBeDefined();
})

test('PUT /songs/:id', async () => {
    const song = {
        name: "Sweet child o mine updated",
    }
    const res = await request(app).put(`/songs/${id}`).send(song);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(song.name);
});

test('DELETE /songs/:id', async () => {
    const res = await request(app).delete(`/songs/${id}`)
    expect(res.status).toBe(204);
});
