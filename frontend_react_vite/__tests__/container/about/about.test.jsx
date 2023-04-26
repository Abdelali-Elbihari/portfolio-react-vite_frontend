import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import About, { ProfileImage, ProfileDescription, ProfileTitle } from '../../../src/container/About/About';


describe('About component', () => {
  describe('Title', () => {
    it('displays the correct title text', async () => {
      render(<About />);
      const title = await screen.findByRole('heading');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H2');
    });
  });

  describe('Profiles', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders profiles with correct data', async () => {
      const mockAbouts = [
        {
          _id: '1',
          imgUrl: {
            asset: {
              _ref: 'image-id-1'
            }
          },
          title: 'Profile 1',
          description: 'Description for profile 1'
        },
        {
          _id: '2',
          imgUrl: '/path/to/image.png',
          title: 'Profile 2',
          description: 'Description for profile 2'
        }
      ];

      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockAbouts)
        })
      );

      render(<About />);

      const profileElements = await screen.findAllByRole('article');

      expect(profileElements.length).toBe(2);

      // Check first profile
      const profile1 = profileElements[0];
      expect(profile1).toContainHTML('<img src="image-id-1"/>'); // Check image source
      expect(profile1).toHaveTextContent('Profile 1'); // Check profile title
      expect(profile1).toHaveTextContent('Description for profile 1'); // Check description

      // Check second profile
      const profile2 = profileElements[1];
      expect(profile2).toContainHTML('<img src="/path/to/image.png"/>'); // Check image source
      expect(profile2).toHaveTextContent('Profile 2'); // Check profile title
      expect(profile2).toHaveTextContent('Description for profile 2'); // Check description

      global.fetch.mockRestore();
    });

    it('renders default profiles if fetch fails', async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error()));

      render(<About />);

      const defaultProfiles = await screen.findAllByRole('article');

      expect(defaultProfiles.length).toBe(3); // Default profiles should have length of 3

      global.fetch.mockRestore();
    });
  });

  describe('ProfileImage', () => {
    it('renders image with correct alt text', () => {
      const mockAbout = {
        _id: '1',
        imgUrl: {
          asset: {
            _ref: 'image-id-1'
          }
        },
        title: 'Profile 1',
        description: 'Description for profile 1'
      };

      render(<ProfileImage about={mockAbout} />);

      const imgElement = screen.getByAltText(mockAbout.title);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement.tagName).toBe('IMG');
      expect(imgElement.src).toContain('image-id-1');
    });

    it('renders fallback image if imgUrl is not an object', () => {
      const mockAbout = {
        _id: '2',
        imgUrl: '/path/to/image.png',
        title: 'Profile 2',
        description: 'Description for profile 2'
      };

      render(<ProfileImage about={mockAbout} />);

      const imgElement = screen.getByAltText(mockAbout.title);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement.tagName).toBe('IMG');
      expect(imgElement.src).toContain('/path/to/image.png');
    });
  });

  describe('ProfileTitle', () => {
    it('renders title with correct text', () => {
      const mockAbout = {
        _id: '3',
        imgUrl: '/path/to/image.png',
        title: 'Profile 3',
        description: 'Description for profile 3'
      };

      render(<ProfileTitle about={mockAbout} />);

      const titleElement = screen.getByText(mockAbout.title);
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.tagName).toBe('H2');
    });
  });

  describe('ProfileDescription', () => {
    it('renders description with correct text', () => {
      const mockAbout = {
        _id: '4',
        imgUrl: '/path/to/image.png',
        title: 'Profile 4',
        description: 'Description for profile 4'
      };

      render(<ProfileDescription about={mockAbout} />);

      const descriptionElement = screen.getByText(mockAbout.description);
      expect(descriptionElement).toBeInTheDocument();
      expect(descriptionElement.tagName).toBe('P');
    });
  });
});
