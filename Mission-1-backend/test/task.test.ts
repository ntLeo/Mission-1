const request = require('supertest');
const app = require('../server');
const serverPort = require('../server');



afterAll(async () => {
    await new Promise(resolve => serverPort.close(resolve));
});


// API 1 TEST

describe('POST /api_1', () => {
    it('Sunny day scenario', async () => {
        const res = await request(app)
            .post('/api_1')
            .send({ model: 'Civic', year: 2020 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('car_value', 6620);
    });

    it('Numbers only is ok', async () => {
        const res = await request(app)
            .post('/api_1')
            .send({ model: '911', year: 2020 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('car_value', 2020);
    });

    it('Negative year', async () => {
        const res = await request(app)
            .post('/api_1')
            .send({ model: 'Task-Force', year: -987 });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Invalid model or year');
    });

    it('Wrong data type', async () => {
        const res = await request(app)
            .post('/api_1')
            .send({ model: 'C200', year: 'twenty twenty' });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'Invalid model or year');
    });
});


// API 2 TEST

describe('POST /api_2', () => {
    it('Some scratch', async () => {
        const res = await request(app)
            .post('/api_2')
            .send({ claim_history: `My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes`});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('risk_rating', 3);
    });

    it('Empty', async () => {
        const res = await request(app)
            .post('/api_2')
            .send({ claim_history: ``});
        expect(res.statusCode).toEqual(400);
        
    });

    it('No claims', async () => {
        const res = await request(app)
            .post('/api_2')
            .send({ claim_history: `Nothing happened, I have no claims`});
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('risk_rating', 1);
    });

});


// API 3 TEST

describe('POST /api_3', () => {
    it('Quote 1 Civic-2014', async () => {
        const res = await request(app)
            .post('/api_3')
            .send({ car_value: 6614, risk_rating: 3 });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('monthly_premium', 17);
        expect(res.body).toHaveProperty('yearly_premium', 198);
    });

    it('Negative', async () => {
        const res = await request(app)
            .post('/api_3')
            .send({ car_value: -6223, risk_rating: -5 });
        expect(res.statusCode).toEqual(400);
        
    });

    it('Risk more than 5', async () => {
        const res = await request(app)
            .post('/api_3')
            .send({ car_value: 6223, risk_rating: 10 });
        expect(res.statusCode).toEqual(400);
        
    });


});
