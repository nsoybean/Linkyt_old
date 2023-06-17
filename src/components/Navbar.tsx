import { useState } from 'react'
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  useBreakpointValue,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { Link } from 'react-router-dom'
import InputSave from './common/Form/InputSave'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

const NavLinks = [
  {
    name: 'Home',
    path: '/home',
  },
  {
    name: 'Saves',
    path: '/saves',
  },
  {
    name: 'Archives',
    path: '/archives',
  },
  {
    name: 'My Stats',
    path: '/stats',
  },
]

export const Navbar = () => {
  const [showUrlInput, setShowUrlInput] = useState(false)

  const showUrl = () => {
    setShowUrlInput(!showUrlInput)
  }

  const isDesktop = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
    xl: true,
  })
  return (
    <Box as="section" pb={{ base: '2', md: '2' }}>
      <Box as="nav" bg="bg.surface" boxShadow="sm">
        <Box py={{ base: '2', lg: '2' }} width="100%">
          {isDesktop ? (
            <HStack minWidth="800px" mx="auto">
              {/* Menus */}

              <ButtonGroup
                mx="auto"
                variant="text"
                spacing={{
                  base: 2,
                  lg: 2,
                  xl: 4,
                  '2xl': 8,
                }}
              >
                {NavLinks.map((item) => (
                  <Button
                    fontSize="lg"
                    fontWeight="bold"
                    key={item.name}
                    as={Link}
                    to={item.path}
                    sx={{
                      '&:hover': {
                        color: 'brand.main',
                      },
                      '&:active': {
                        color: 'brand.main',
                      },
                      '&:focus': {
                        color: 'brand.main',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </ButtonGroup>
              <HStack minWidth="40vw" justifyContent="flex-end">
                {showUrlInput ? (
                  <HStack>
                    <InputSave />
                    <IconButton
                      variant="ghost"
                      sx={{
                        borderRadius: '50%',
                      }}
                      aria-label="hide url input"
                      onClick={showUrl}
                      icon={<CloseIcon />}
                    />
                  </HStack>
                ) : (
                  <Box>
                    <Button
                      onClick={showUrl}
                      variant="fancy"
                      rightIcon={<AddIcon />}
                    >
                      Add url
                    </Button>
                  </Box>
                )}
              </HStack>

              {/* Sign in/ up */}
              <HStack justifySelf="flex-end">
                <Button fontSize="lg" variant="tertiary">
                  Sign in
                </Button>

                {/* Light/dark mode */}
                <ColorModeSwitcher />
              </HStack>
            </HStack>
          ) : (
            <IconButton
              variant="tertiary"
              icon={<FiMenu fontSize="1.25rem" />}
              aria-label="Open Menu"
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
