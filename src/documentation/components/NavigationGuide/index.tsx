'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography, Button, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Icon } from '@iconify/react';
import type { NavigationGuideProps } from '@/documentation/types';

const NavigationGuide = ({ currentSection, previousSection, nextSection }: NavigationGuideProps) => {
  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        pt: 4,
        mt: 6
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {/* Previous Section */}
        <Box flex="1" display="flex" justifyContent="flex-start">
          {previousSection && (
            <Button
              component={Link}
              href={previousSection.href}
              startIcon={<Icon icon="mdi:arrow-left" width={20} height={20} />}
              variant="outlined"
              sx={{ textTransform: 'none' }}
            >
              <Box textAlign="left">
                <Typography variant="caption" display="block" color="text.secondary">
                  Previous
                </Typography>
                <Typography variant="body2" display="block">
                  {previousSection.title}
                </Typography>
              </Box>
            </Button>
          )}
        </Box>

        {/* Current Section Indicator */}
        <Box flex="0" mx={2}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {currentSection}
          </Typography>
        </Box>

        {/* Next Section */}
        <Box flex="1" display="flex" justifyContent="flex-end">
          {nextSection && (
            <Button
              component={Link}
              href={nextSection.href}
              endIcon={<Icon icon="mdi:arrow-right" width={20} height={20} />}
              variant="outlined"
              sx={{ textTransform: 'none' }}
            >
              <Box textAlign="right">
                <Typography variant="caption" display="block" color="text.secondary">
                  Next
                </Typography>
                <Typography variant="body2" display="block">
                  {nextSection.title}
                </Typography>
              </Box>
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface DocumentationBreadcrumbsProps {
  sections: Array<{
    title: string;
    href?: string;
  }>;
}

const DocumentationBreadcrumbs = ({ sections }: DocumentationBreadcrumbsProps) => {
  return (
    <Breadcrumbs separator={<Icon icon="mdi:chevron-right" width={16} height={16} />} sx={{ mb: 3 }}>
      <MuiLink component={Link} href="/documentation" color="inherit" underline="hover">
        Documentation
      </MuiLink>
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;

        if (isLast) {
          return (
            <Typography key={section.title} color="text.primary">
              {section.title}
            </Typography>
          );
        }

        return (
          <MuiLink key={section.title} component={Link} href={section.href || '#'} color="inherit" underline="hover">
            {section.title}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
};

interface TableOfContentsProps {
  sections: Array<{
    id: string;
    title: string;
    level?: number;
  }>;
}

const TableOfContents = ({ sections }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Find the current section based on scroll position
      const currentSection = sections.find((section, index) => {
        const element = document.getElementById(section.id);

        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const elementTop = window.scrollY + rect.top;

        // Check if this section is currently in view
        const nextSection = sections[index + 1];

        if (nextSection) {
          const nextElement = document.getElementById(nextSection.id);

          if (nextElement) {
            const nextRect = nextElement.getBoundingClientRect();
            const nextElementTop = window.scrollY + nextRect.top;

            return scrollPosition >= elementTop && scrollPosition < nextElementTop;
          }
        }

        // For the last section, just check if we've reached it
        return scrollPosition >= elementTop;
      });

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, activeSection]);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 120,
        right: 24, // Reduced from 32 to be closer to edge
        width: 280,
        p: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        maxHeight: 'calc(100vh - 200px)',
        overflow: 'auto',
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        // Hide on smaller screens to prevent overlap
        display: { xs: 'none', lg: 'block' }
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        On This Page
      </Typography>
      <Box component="nav">
        {sections.map(section => {
          const isActive = activeSection === section.id;

          return (
            <Button
              key={section.id}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                py: 0.5,
                px: 1,
                minHeight: 'auto',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'primary.main' : 'text.secondary',
                pl: (section.level || 1) * 2,
                bgcolor: isActive ? 'primary.50' : 'transparent',
                borderLeft: isActive ? '3px solid' : '3px solid transparent',
                borderLeftColor: isActive ? 'primary.main' : 'transparent',
                '&:hover': {
                  bgcolor: isActive ? 'primary.100' : 'action.hover',
                  color: isActive ? 'primary.main' : 'text.primary'
                }
              }}
              onClick={() => handleScrollToSection(section.id)}
            >
              {section.title}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export { NavigationGuide, DocumentationBreadcrumbs, TableOfContents };
