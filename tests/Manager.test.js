const Manager = require("./../lib/Manager");

describe("Manager class", () => {
    describe("Constructor function", () => {
        it("Sets object's name, id, email and school properties equal to provided arguments", () => {
            const testManager = new Manager("Stephen", 1, "test@test.com", 10);

            expect(testManager.name).toEqual("Stephen");
            expect(testManager.id).toEqual(1);
            expect(testManager.email).toEqual("test@test.com");
            expect(testManager.officeNumber).toEqual(10);
        })
    })

    describe("getOffice method", () => {
        it("Returns officeNumber property", () => {
            const testManager = new Manager("Stephen", 1, "test@test.com", 10);

            expect(testManager.getOffice()).toEqual(10);
        })
    })

    describe("getRole method", () => {
        it("Returns 'Manager'", () => {
            const testManager = new Manager;

            expect(testManager.getRole()).toEqual("Manager");
        })
    })
})