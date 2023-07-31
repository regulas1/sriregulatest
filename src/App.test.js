import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Image from "../src/Image/Index";

jest.spyOn(global, "fetch").mockResolvedValue({
  json: () =>
    Promise.resolve({
      title: "Test Product",
      description: "Test product description",
      price: "19.99",
    }),
});

describe("Image Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders and displays product information after loading", async () => {
    await act(async () => {
      render(<Image />);
    });

    await screen.findByText("Test Product");
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test product description")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });

  it("displays an error message when the fetch fails", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

    await act(async () => {
      render(<Image />);
    });

    await screen.findByText("Error: Network error");
    expect(screen.getByText("Error: Network error")).toBeInTheDocument();
  });

  it("updates selectedSize state when size buttons are clicked", async () => {
    await act(async () => {
      render(<Image />);
    });

    await screen.findByText("Test Product");

    const sizeButtonS = screen.getByText("S");
    const sizeButtonM = screen.getByText("M");
    const sizeButtonL = screen.getByText("L");

    act(() => {
      sizeButtonS.click();
    });

    expect(screen.getByText("SIZE * S")).toBeInTheDocument();

    act(() => {
      sizeButtonM.click();
    });

    expect(screen.getByText("SIZE * M")).toBeInTheDocument();

    act(() => {
      sizeButtonL.click();
    });

    expect(screen.getByText("SIZE * L")).toBeInTheDocument();
  });
});
