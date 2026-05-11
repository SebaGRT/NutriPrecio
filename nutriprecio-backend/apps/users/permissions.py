from rest_framework import permissions


class IsSeller(permissions.BasePermission):
    """Allow access only to users with is_seller=True."""
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, 'is_seller', False)
