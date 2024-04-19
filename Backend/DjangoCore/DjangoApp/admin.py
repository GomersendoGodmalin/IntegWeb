from django.contrib.auth import get_user_model
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser


User = get_user_model()


admin.site.register(User)