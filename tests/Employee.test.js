const Employee = require("./../lib/Employee");

describe("Employee class", () => {
    describe("Constructor function", () => {
        it("Sets object's name, id and email properties equal to provided arguments", () => {
            const testEmployee = new Employee("Stephen", 1, "test@test.com");

            expect(testEmployee.name).toEqual("Stephen");
            expect(testEmployee.id).toEqual(1);
            expect(testEmployee.email).toEqual("test@test.com");
        })
    })

    describe("getName method", () => {
        it("Returns name property", () => {
            const testEmployee = new Employee("Stephen");

            expect(testEmployee.getName()).toEqual("Stephen");
        })
    })

    describe("getId method", () => {
        it("Returns ID property", () => {
            const testEmployee = new Employee("Stephen", 1)

            expect(testEmployee.getId()).toEqual(1);
        })
    })

    describe("getEmail method", () => {
        it("Returns email property", () => {
            const testEmployee = new Employee("Stephen", 1, "test@test.com")

            expect(testEmployee.getEmail()).toEqual("test@test.com");
        })
    })

    describe("getRole method", () => {
        it("Returns 'Employee'", () => {
            const testEmployee = new Employee;

            expect(testEmployee.getRole()).toEqual("Employee");
        })
    })
})