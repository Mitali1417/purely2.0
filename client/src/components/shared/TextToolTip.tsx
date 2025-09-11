import React from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface TextToolTipProps extends React.ComponentProps<typeof TooltipContent> {
  children: React.ReactNode;
  label: React.ReactNode;
}

export const TextToolTip: React.FC<TextToolTipProps> = ({
  children,
  label,
  ...props
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild role="button">
          {children}
        </TooltipTrigger>
        <TooltipContent {...props}>
          <span>{label}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
