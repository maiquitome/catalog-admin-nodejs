import { validate as uuidValidate, validate } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityID from "./unique-entity-id.vo";

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityID.prototype as any, "validate");
// }

describe("UniqueEntityID Unit Tests", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });
  
  const validateSpy = jest.spyOn(UniqueEntityID.prototype as any, "validate");
  
  // beforeEach(() => validateSpy.mockClear())
  
  it("should throw error when uuid is invalid", () => {
    // const validateSpy = spyValidateMethod();
    
    expect(() => new UniqueEntityID("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "c933df34-509e-471d-a606-b869e2a58294";
    const valueObject = new UniqueEntityID(uuid);
    // const validateSpy = spyValidateMethod();
    
    expect(valueObject.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });
  
  it("should be valid uuid", () => {
    const valueObject = new UniqueEntityID();
    // const validateSpy = spyValidateMethod();
    
    expect(uuidValidate(valueObject.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
})