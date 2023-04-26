import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { client, urlFor } from '../../../src/client';
import About, { ProfileImage, ProfileDescription, ProfileTitle } from '../../../src/container/About/About';

const mockAbouts = [
  {
    _id: '1',
    imgUrl: {
      asset: {
        _id: 'Image1',
        _ref: 'image-Image1-2000x3000-jpg'
      }
    },
    title: 'Profile 1',
    description: 'Description for profile 1'
  },
  {
    _id: '2',
    imgUrl: {
      asset: {
        _id: 'Image2',
        _ref: 'image-Image2-2000x3000-jpg'
      }
    },
    title: 'Profile 2',
    description: 'Description for profile 2'
  }
];

function getImageUrl(about) {
  const options = urlFor(about.imgUrl).options;
  return `${options.baseUrl}/images/${options.projectId}/${options.dataset}/${about.imgUrl.asset._id}-2000x3000.jpg`;
}

describe('About component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Title', () => {
    it('displays the correct title text', async () => {
      render(<About />);
      const title = await screen.findByRole('heading');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H2');
    });
  });

  describe('Profiles', () => {
    it('renders profiles with correct data', async () => {
      jest.spyOn(client, 'fetch').mockImplementationOnce(async () => Promise.resolve(mockAbouts));
      render(<About />);

      const profileElements = await screen.findAllByTestId('profile-item');
      expect(profileElements.length).toBe(2);

      // Check first profile
      const [about1, about2] = mockAbouts;
      const [profile1, profile2] = profileElements;
      expect(within(profile1).getByRole('img')).toHaveAttribute('alt', 'Profile 1');
      expect(within(profile1).getByRole('img')).toHaveAttribute('src', getImageUrl(about1));

      // Check second profile
      expect(within(profile2).getByRole('img')).toHaveAttribute('alt', 'Profile 2');
      expect(within(profile2).getByRole('img')).toHaveAttribute('src', getImageUrl(about2));
    });

    it('renders default profiles if fetch fails', async () => {
      jest.spyOn(client, 'fetch').mockImplementationOnce(async () => Promise.reject(new Error()));
      render(<About />);

      const defaultProfiles = await screen.findAllByTestId('profile-item');
      expect(defaultProfiles.length).toBe(7);
    });
  });

  describe('ProfileImage', () => {
    it('renders image with correct alt text', () => {
      const mockAbout = {
        _id: '1',
        imgUrl: {
          asset: {
            _ref: 'image-Image1-2000x3000-jpg'
          }
        },
        title: 'Profile 1',
        description: 'Description for profile 1'
      };

      render(<ProfileImage about={mockAbout} />);

      const imgElement = screen.getByAltText(mockAbout.title);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement.tagName).toBe('IMG');
      expect(imgElement.src).toContain('Image1-2000x3000.jpg');
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
