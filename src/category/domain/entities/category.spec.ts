import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";
import { validate as uuidValidate } from 'uuid';

describe("Category Unit Tests", () => {
  test("category constructor", () => {
    // only name
    let category = new Category({ name: "Movie 1" })
    const props = omit(category.props, "created_at")
    expect(props).toStrictEqual({
      name: "Movie 1",
      description: null,
      is_active: true
    })
    expect(category.props.created_at).toBeInstanceOf(Date);

    // all props
    const created_at_movie_2 = new Date();
    category = new Category({
      name: "Movie 2",
      description: "some description",
      is_active: false,
      created_at: created_at_movie_2
    })
    expect(category.props).toStrictEqual({
      name: "Movie 2",
      description: "some description",
      is_active: false,
      created_at: created_at_movie_2
    })

    // name and description
    category = new Category({
      name: "Movie 3",
      description: "another description"
    })
    expect(category.props).toMatchObject({
      name: "Movie 3",
      description: "another description"
    })

    // name and is_active
    category = new Category({
      name: "Movie 4",
      is_active: true
    })
    expect(category.props).toMatchObject({
      name: "Movie 4",
      is_active: true
    })

    // name and created_at
    const created_at_movie_5 = new Date();
    category = new Category({
      name: "Movie 5",
      created_at: created_at_movie_5
    })
    expect(category.props).toMatchObject({
      name: "Movie 5",
      created_at: created_at_movie_5
    })
  })

  test("id field", () => {
    type CategoryData = { props: CategoryProperties, id?: string };

    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: "c933df34-509e-471d-a606-b869e2a58294"}
    ];

    data.forEach(i => {
      const category = new Category(i.props, i.id);
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
    });
  })

  test("getter and setter of name property", () => {
    const category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  })

  test("getter and setter of description property", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "some description"
    });
    expect(category.description).toBe("some description");

    category["description"] = "another description";
    expect(category.description).toBe("another description");

    category["description"] = undefined;
    expect(category.description).toBeNull();

    category["description"] = null;
    expect(category.description).toBeNull();
  })

  test("getter and setter of is_active property", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();

    category["is_active"] = true;
    expect(category.is_active).toBeTruthy();

    category["is_active"] = false;
    expect(category.is_active).toBeFalsy();

    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();

    category["is_active"] = null;
    expect(category.is_active).toBeTruthy();
  })

  test("getter of created_at property", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at: created_at
    });
    expect(category.created_at).toBe(created_at);
  })
});