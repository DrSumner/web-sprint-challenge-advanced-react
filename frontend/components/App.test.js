 // Write your tests here
 import React from 'react'
 import { render, fireEvent, screen, waitFor } from '@testing-library/react'
 import '@testing-library/jest-dom/extend-expect'
 import AppFunctional from './AppFunctional' 

describe('sanity', () => {
  let  left, right, up, down, email

  beforeEach(() => {

    render(<AppFunctional/>)
    //user = userEvent.setup()
    left = screen.getByText('LEFT')
    right = screen.getByText('RIGHT')
    up = screen.getByText('UP')
    down = screen.getByText('DOWN')
    email = document.querySelector('#email')
  })

  test('[1] Grid works as intended', async () => {
    screen.debug()

    await fireEvent.click(left)
    await fireEvent.click(left)
    expect(screen.getByText("You can't go left"))
  })

  test('[2] Grid works as intended', async () => {
    screen.debug()

    await fireEvent.click(up)
    await fireEvent.click(right)
    expect(screen.getByText("You moved 2 times"))
    expect(screen.getByText("Coordinates (3, 1)"))
  })
  test('[3] Coordinates are correct', async () => {
    screen.debug()

    await fireEvent.click(up)
    await fireEvent.click(up)
    await fireEvent.click(left)
    expect(screen.getByText("Coordinates (1, 1)"))
  })
  test('[4] Steps works as intended', async () => {
    screen.debug()

    await fireEvent.click(down)
    await fireEvent.click(down)
    await fireEvent.click(down)
    await fireEvent.click(down)
    await fireEvent.click(left)
    expect(screen.getByText("Coordinates (1, 3)"))
    expect(screen.getByText("You moved 2 times"))
  })
  test('[5] App is functional', async () => {
    screen.debug()

    await fireEvent.click(up)
    await fireEvent.click(left)
    await fireEvent.click(down)
    await fireEvent.click(right)
    fireEvent.change(email, { target: { value: 'tre@diff.com' } })
    
    expect(screen.getByText("Coordinates (2, 2)"))
    expect(screen.getByText("You moved 4 times"))
    expect(screen.findByText("tre win #72"))
  })

})
