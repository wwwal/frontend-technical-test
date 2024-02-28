import { screen } from '@testing-library/react'
import Chat from '../Chat'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../../utils/test-utils'


describe('Home', () => {
    it('Renders list without delete', () => {
        renderWithProviders(<Chat
            loading={false}
            deleteEnabled={false}
        />)

        const deleteButton = screen.queryAllByTestId('DeleteIcon');

        expect(deleteButton.length).toEqual(0)
    })
    it('Renders list with delete', () => {
        renderWithProviders(<Chat
            loading={false}
            deleteEnabled={true}
        />)

        const deleteButton = screen.getAllByTestId('DeleteIcon');

        expect(deleteButton.length).not.toEqual(0)
    })
})