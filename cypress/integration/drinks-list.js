/// <reference types="cypress" />
import "@testing-library/cypress/add-commands";

beforeEach(() => {
  cy.server();
  cy.route("GET", "https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list", "fixture:ingredients.json").as(
    "getIngredients"
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

    cy.get("[data-testid='drinks-list']").children().should("have.length", 5);
  });

  it("Add Queen Bee to order from dialog", () => {
    cy.wait("@getIngredients");

    cy.get(".MuiFormControl-root").find("div").click({ multiple: true, force: true });

    cy.findByText("Sherry").click();

    cy.get("[data-testid='drinks-list']").children().eq(2).findByTestId("drink-image").should("exist").click();

    cy.get("[data-testid='badge-order']").should("not.exist");

    cy.findByText("Add to order").click();

    cy.get("[data-testid='badge-order']").findByText("1").should("exist");
  });

  it("Add Queen Bee to order from card", () => {
    cy.wait("@getIngredients");

    cy.get(".MuiFormControl-root").find("div").click({ multiple: true, force: true });

    cy.findByText("Sherry").click();

    cy.get("[data-testid='badge-order']").should("not.exist");

    cy.get("[data-testid='drinks-list']").children().eq(2).findByTestId("icon-actions").children().eq(1).click();

    cy.get("[data-testid='badge-order']").findByText("1").should("exist");

    cy.get(".MuiSnackbar-root").find("div").should("exist");
  });

  it("Add another Queen Bee", () => {
    cy.wait("@getIngredients");

    cy.get(".MuiFormControl-root").find("div").click({ multiple: true, force: true });

    cy.findByText("Sherry").click();

    cy.get("[data-testid='drinks-list']").children().eq(2).findByTestId("icon-actions").children().eq(1).click();

    cy.get("[data-testid='icon-order']").click();

    cy.get("[data-testid='quantity-section']").should("exist").children().eq(1).findByText("1");

    cy.get("[data-testid='quantity-section']").should("exist").children().eq(2).click();

    cy.get("[data-testid='quantity-section']").should("exist").children().eq(1).findByText("2");
  });

  it("Send order", () => {
    cy.wait("@getIngredients");

    cy.get(".MuiFormControl-root").find("div").click({ multiple: true, force: true });

    cy.findByText("Sherry").click();

    cy.get("[data-testid='drinks-list']").children().eq(2).findByTestId("icon-actions").children().eq(1).click();

    cy.get("[data-testid='icon-order']").click();

    cy.findByText("Send order").click();

    cy.get(".MuiSnackbar-root").find("div").should("exist");
  });
});
