const Intern = require("./../lib/Intern");

describe("Intern class", () => {
    describe("getSchool method", () => {
        it("Returns school property", () => {
            const testIntern = new Intern("Stephen", 1, "test@test.com", "JMU");

            expect(testIntern.getSchool()).toEqual("JMU");
        })
    })

    describe("getRole method", () => {
        it("Returns 'Intern'", () => {
            const testIntern = new Intern;

            expect(testIntern.getRole()).toEqual("Intern");
        })
    })
})