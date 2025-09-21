import {
  // Navigation icons
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  HeartIcon,
  UserIcon,
  // Action icons
  ChatBubbleOvalLeftIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  // UI icons
  BellIcon,
  XMarkIcon,
  TrashIcon,
  ShareIcon,
  // Auth icons
  ArrowRightOnRectangleIcon,
  // Additional icons
  CameraIcon,
  UsersIcon,
  DocumentIcon,
  ExclamationTriangleIcon,
  CircleStackIcon,
  PencilIcon,
} from '@heroicons/vue/24/outline'

import {
  // Filled versions for active states
  HomeIcon as HomeIconSolid,
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserIcon as UserIconSolid,
} from '@heroicons/vue/24/solid'

/**
 * Centralized icon management composable
 * Provides clean interface for all app icons with consistent naming
 */
export function useIcons() {
  // Navigation icons mapping
  const navigationIcons = {
    home: HomeIcon,
    homeActive: HomeIconSolid,
    search: MagnifyingGlassIcon,
    add: PlusIcon,
    activity: HeartIcon,
    activityActive: HeartIconSolid,
    profile: UserIcon,
    profileActive: UserIconSolid,
  }

  // Post action icons
  const postActionIcons = {
    like: HeartIcon,
    likeActive: HeartIconSolid,
    comment: ChatBubbleOvalLeftIcon,
    share: PaperAirplaneIcon,
    bookmark: BookmarkIcon,
    bookmarkActive: BookmarkIconSolid,
    menu: EllipsisHorizontalIcon,
  }

  // Header action icons
  const headerIcons = {
    search: MagnifyingGlassIcon,
    notifications: BellIcon,
    messages: ChatBubbleOvalLeftIcon,
    logout: ArrowRightOnRectangleIcon,
  }

  // Utility icons
  const utilityIcons = {
    close: XMarkIcon,
    delete: TrashIcon,
    share: ShareIcon,
    add: PlusIcon,
    camera: CameraIcon,
    users: UsersIcon,
    document: DocumentIcon,
    warning: ExclamationTriangleIcon,
    database: CircleStackIcon,
    edit: PencilIcon,
  }

  // Get icon by category and name
  const getIcon = (category, name) => {
    const iconMaps = {
      navigation: navigationIcons,
      post: postActionIcons,
      header: headerIcons,
      utility: utilityIcons,
    }

    return iconMaps[category]?.[name] || null
  }

  // Get navigation icon with active state support
  const getNavigationIcon = (name, isActive = false) => {
    const activeKey = `${name}Active`
    return isActive && navigationIcons[activeKey]
      ? navigationIcons[activeKey]
      : navigationIcons[name]
  }

  // Get post action icon with active state support
  const getPostActionIcon = (name, isActive = false) => {
    const activeKey = `${name}Active`
    return isActive && postActionIcons[activeKey]
      ? postActionIcons[activeKey]
      : postActionIcons[name]
  }

  return {
    // Icon categories
    navigationIcons,
    postActionIcons,
    headerIcons,
    utilityIcons,

    // Helper functions
    getIcon,
    getNavigationIcon,
    getPostActionIcon,

    // Direct icon exports for specific use cases
    icons: {
      // Navigation
      HomeIcon,
      HomeIconSolid,
      MagnifyingGlassIcon,
      PlusIcon,
      HeartIcon,
      HeartIconSolid,
      UserIcon,
      UserIconSolid,

      // Actions
      ChatBubbleOvalLeftIcon,
      PaperAirplaneIcon,
      BookmarkIcon,
      BookmarkIconSolid,
      EllipsisHorizontalIcon,

      // Utility
      BellIcon,
      XMarkIcon,
      TrashIcon,
      ShareIcon,
      ArrowRightOnRectangleIcon,
      CameraIcon,
      UsersIcon,
      DocumentIcon,
      ExclamationTriangleIcon,
      CircleStackIcon,
      PencilIcon,
    }
  }
}
