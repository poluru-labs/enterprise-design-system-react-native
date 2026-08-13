import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { FileUpload } from './FileUpload';

describe('FileUpload', () => {
  it('renders label and dropzone', () => {
    render(withTheme(<FileUpload label="Attachments" />));
    expect(screen.getByText('Attachments')).toBeTruthy();
    expect(screen.getByLabelText('Attachments')).toBeTruthy();
  });

  it('calls onPress/onPick and onFilesSelected', async () => {
    const onPress = jest.fn();
    const onPick = jest.fn(() => ['report.pdf', 'notes.txt']);
    const onFilesSelected = jest.fn();

    render(
      withTheme(
        <FileUpload
          label="Upload"
          multiple
          onPress={onPress}
          onPick={onPick}
          onFilesSelected={onFilesSelected}
        />,
      ),
    );

    fireEvent.press(screen.getByLabelText('Upload'));
    expect(onPress).toHaveBeenCalled();
    expect(onPick).toHaveBeenCalled();
    await waitFor(() => {
      expect(onFilesSelected).toHaveBeenCalledWith(['report.pdf', 'notes.txt']);
      expect(screen.getByText('report.pdf')).toBeTruthy();
    });
  });

  it('does not pick when disabled', () => {
    const onPress = jest.fn();
    render(withTheme(<FileUpload label="Upload" disabled onPress={onPress} />));
    fireEvent.press(screen.getByLabelText('Upload'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
