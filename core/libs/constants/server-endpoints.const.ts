export const BASE_URL = "https://artz-backend.appspot.com"
// export const BASE_URL = "http://localhost:6000"

export const API_BUCKET = () => `${BASE_URL}/api/buckets/`

export const API_AUTH = {
  USER_LOGIN:           () => `${BASE_URL}/auth/login`,
  USER_REGISTER:        () => `${BASE_URL}/auth/login`,

  USER_UPDATE:          () => `${BASE_URL}/auth/me/update`,
  USER_UPDATEPASSWORD:  () => `${BASE_URL}/auth/me/update-password`
}

export const API_GALLERY = {
  CATEGORIES:                   ()                   => `${BASE_URL}/api/categories`,
  CATEGORIES_BYID:              (id: string)         => `${BASE_URL}/api/categories/by-id/${id}`,
  CATEGORIES_BYSLUG:            (slug: string)       => `${BASE_URL}/api/categories/by-slug/${slug}`,

  VENDOR:                       ()                   => `${BASE_URL}/api/vendors`,
  VENDOR_BYID:                  (id: string)         => `${BASE_URL}/api/vendors/id/${id}`,
  VENDOR_BYSLUG:                (slug: string)       => `${BASE_URL}/api/vendors/slug/${slug}`,
  VENDOR_BYSLUG_UPDATECATEGORY: (slug: string)       => `${BASE_URL}/api/vendors/slug/${slug}/update-category`,
  VENDOR_BYCATEGORY:            (categoryId: string) => `${BASE_URL}/api/vendors/by-category/${categoryId}`,
  VENDOR_BYCATEGORY_DEEP:       (categoryId: string) => `${BASE_URL}/api/vendors/by-category-deep/${categoryId}`,
  VENDOR_GET_ME:                ()                   => `${BASE_URL}/api/vendors/by-user}`,
  
  PACKAGES:                     (id?: string)        => `${BASE_URL}/api/vendorapi-packages/${id}`,
  PACKAGES_UPDATECATEGORIES:    (id?: string)        => `${BASE_URL}/api/vendorapi-packages/${id}/update-categories`,
  PACKAGEITEMS:                 (id?: string)        => `${BASE_URL}/api/vendorapi-package-items/${id}`,
  GOODS:                        (id?: string)        => `${BASE_URL}/api/vendorapi-goods/${id}`
}