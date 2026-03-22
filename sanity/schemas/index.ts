import { project, projectBlockTypes } from './project'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { contactPage } from './contactPage'
import { globalSettings } from './globalSettings'

// Block types must be registered alongside the documents that reference them
export const schemaTypes = [
  // Documents
  project,
  homePage,
  aboutPage,
  contactPage,
  globalSettings,
  // Content block object types
  ...projectBlockTypes,
]
