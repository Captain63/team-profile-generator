const Engineer = require("./../lib/Engineer");

describe("Engineer class", () => {
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