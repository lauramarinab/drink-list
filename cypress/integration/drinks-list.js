/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

beforeEach(() => {
  cy.server();
  cy.route("GET", "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list", "fixture:ingredients.json").as(
    "getIngredients"
  );

  cy.route("GET", "https://www.thecocktaildb.com/apiapi/json/v1/1/lookup.php?i=11987    ", "fixture:queen-bee.json").as(
    "getQueenBee"
  );

  cy.visit("http://localhost:3000");
});

describe("Drinks List", () => {
  it("Select ingrediet Sherry from dropdown", () => {
    cy.wait("@getIngredients");

    cy.get(".MuiFormControl-root").find("div").click({ multiple: true, force: true });

    cy.findByText("Sherry").click();
  });

  it("Check number of drinks", () => {
    cy.wait("@getIngredients");

    cy.get(".MuiFormControl-root").find("div").click({ multiple: true, force: true });

    cy.findByText("Sherry").click();

    cy.findByText("Queen Bee").should("exist");

    cy.get("[data-testid='drink-card']").should("have.length", 5);
  });

  it("Add Queen Bee to order and compare badge", () => {
    cy.wait("@getIngredients");

    cy.get(".MuiFormControl-root").find("div").click({ multiple: true, force: true });
    cy.findByText("Sherry").click();

    cy.get("[data-testid='drink-card']").children().eq(2).click();

    cy.get("[data-testid='badge-order']").should("not.exist");

    cy.findByText("Add to order").click();

    cy.get("[data-testid='badge-order']").findByText("1").should("exist");
  });
});
