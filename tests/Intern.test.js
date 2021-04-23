const Intern = require("./../lib/Intern");

describe("Intern class", () => {
    describe("Constructor function", () => {
        it("Sets object's name, id, email and school properties equal to provided arguments", () => {
            const testIntern = new Intern("Stephen", 1, "test@test.com", "JMU");

            expect(testIntern.name).toEqual("Stephen");
            expect(testIntern.id).toEqual(1);
            expect(testIntern.email).toEqual("test@test.com");
            expect(testIntern.school).toEqual("JMU");
        })
    })

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