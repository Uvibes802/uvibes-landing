"use client";

import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(`
  background: var(--gradientColor-button);
  color: #F4ECEC;
  border-radius: 2rem;
  padding: var(--spacing-ref);
  border: none;
  min-width: 10rem;
  cursor: pointer;
  height: auto;
  font-family: var(--button-font);
  font-size: calc(var(--font-size-ref) * 1);
  letter-spacing: var(--spacing-letter);
  text-transform: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    opacity: 0.95;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  }
`);
