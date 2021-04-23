const Engineer = require("./../lib/Engineer");

describe("Engineer class", () => {
    describe("Constructor function", () => {
        it("Sets object's name, id, email and gitHub properties equal to provided arguments", () => {
            const testEngineer = new Engineer("Stephen", 1, "test@test.com", "Captain63");

            expect(testEngineer.name).toEqual("Stephen");
            expect(testEngineer.id).toEqual(1);
            expect(testEngineer.email).toEqual("test@test.com");
            expect(testEngineer.gitHub).toEqual("Captain63");
        })
    })

    describe("getGitHub method", () => {
        it("Returns gitHub property", () => {
            const testEngineer = new Engineer("Stephen", 1, "test@test.com", "Captain63");

            expect(testEngineer.getGitHub()).toEqual("Captain63");
        })
    })

    describe("getRole method", () => {
        it("Returns 'Engineer'", () => {
            const testEngineer = new Engineer;

            expect(testEngineer.getRole()).toEqual("Engineer");
        })
    })
})