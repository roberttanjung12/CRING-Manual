import { type MouseEvent, useState, type ReactNode } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

interface Props {
  children: Readonly<ReactNode>;
  text: number | string;
  isOpen?: boolean;
  isCopy?: boolean;
  isSpace?: boolean;
  top?: number | string;
}

/**
 * A component that adds a copy-to-clipboard functionality to its children.
 *
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The content to be displayed with copy functionality
 * @param {string|number} props.text - The text to be copied to clipboard
 * @param {boolean} [props.isOpen=true] - Whether the component should be rendered
 * @param {boolean} [props.isCopy=true] - Whether the copy functionality should be enabled
 * @param {boolean} [props.isSpace=true] - Whether to add padding and margin to the component
 * @param {number} [props.top=0] - The top position of the copy button
 *
 * @returns {React.JSX} A Typography component with copy-to-clipboard functionality
 *
 * @example
 * <Clipboard text="Text to be copied">
 *   This text will have a copy button on hover
 * </Clipboard>
 */
const Clipboard = ({
  children,
  text,
  isOpen = true,
  isCopy = true,
  isSpace = true,
  top = 0
}: Props): Readonly<ReactNode> => {
  const [isShow, setIsShow] = useState(false);

  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = async (event: MouseEvent) => {
    event.preventDefault();

    await navigator.clipboard.writeText(String(text));

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
      setIsShow(false);
    }, 2000);
  };

  return (
    isOpen && (
      <Typography
        data-testid="Copy"
        component="span"
        position="relative"
        px={isSpace ? 9 : 0}
        mx={isSpace ? -9 : 0}
        sx={{ color: ({ palette }) => (hasCopied ? palette.success.dark : '') }}
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => !hasCopied && setIsShow(false)}
      >
        <>{children}</>
        {isCopy && isShow && (
          <Box position="absolute" top={top} right={0}>
            {!hasCopied ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                title={`Salin ${text}`}
                className="--no-scroll --no-click"
                sx={{ minWidth: 0 }}
                onClick={onCopy}
              >
                <ContentCopyOutlinedIcon fontSize="inherit" />
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="small"
                title="Tersalin"
                className="--no-scroll --no-click"
                sx={{ minWidth: 0 }}
              >
                <CheckCircleOutlineOutlinedIcon fontSize="inherit" />
              </Button>
            )}
          </Box>
        )}
      </Typography>
    )
  );
};

export default Clipboard;
