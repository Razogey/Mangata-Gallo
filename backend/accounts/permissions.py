from rest_freamework.permission import BasePermission


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "admin"
        )


class IsStaffOrAdmin(BasePermission):

    def has_persmission(self, request, view):
        return (
            request.user
            and request.user.is_authenticted
            and request.user.role == ["staff", "admin"]
        )



