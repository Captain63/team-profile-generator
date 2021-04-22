const Manager = require("./../lib/Manager");

describe("Manager class", () => {
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