import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Hero from '../landing_page/home/Hero';

const renderHero = () => render(<MemoryRouter><Hero /></MemoryRouter>);

describe("Hero Component", () => {
  test("renders hero image", () => {
    renderHero();
    const heroImage = screen.getByAltText("Hero Image");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "media/homeHero.png");
  });

  test("renders main heading", () => {
    renderHero();
    expect(screen.getByText("Invest in everything")).toBeInTheDocument();
  });

  test("renders signup button", () => {
    renderHero();
    expect(screen.getByRole("link", { name: /signup now/i })).toBeInTheDocument();
  });
});
