'use client';

import type { ReactNode } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Icon } from '@iconify/react';

interface ExampleSectionProps {
  id?: string;
  title: string;
  description?: string;
  badge?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  children: ReactNode;
  prerequisites?: string[];
  relatedTopics?: string[];
}

const ExampleSection = ({
  id,
  title,
  description,
  badge,
  difficulty = 'beginner',
  children,
  prerequisites,
  relatedTopics
}: ExampleSectionProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'mdi:star-outline';
      case 'intermediate':
        return 'mdi:star-half-full';
      case 'advanced':
        return 'mdi:star';
      default:
        return 'mdi:star-outline';
    }
  };

  return (
    <Box
      id={id}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 3,
        mb: 4,
        bgcolor: 'background.paper'
      }}
    >
      {/* Header */}
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {badge && (
            <Chip
              label={badge}
              size="small"
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 500
              }}
            />
          )}
          <Chip
            icon={<Icon icon={getDifficultyIcon(difficulty)} width={16} height={16} />}
            label={difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            size="small"
            color={getDifficultyColor(difficulty)}
            variant="outlined"
          />
        </Box>
        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
        )}

        {/* Prerequisites */}
        {prerequisites && prerequisites.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              <Icon
                icon="mdi:information-outline"
                width={16}
                height={16}
                style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}
              />
              Prerequisites:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {prerequisites.map(prerequisite => (
                <Chip key={prerequisite} label={prerequisite} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}

        {/* Related Topics */}
        {relatedTopics && relatedTopics.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              <Icon
                icon="mdi:link-variant"
                width={16}
                height={16}
                style={{ marginRight: '4px', verticalAlign: 'text-bottom' }}
              />
              Related Topics:
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {relatedTopics.map(topic => (
                <Chip key={topic} label={topic} size="small" variant="outlined" sx={{ bgcolor: 'action.hover' }} />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* Content */}
      <Box>{children}</Box>
    </Box>
  );
};

export default ExampleSection;
