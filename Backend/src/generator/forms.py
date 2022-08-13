# from django.contrib.auth import forms
from django import forms
from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm
from django.contrib.auth.models import User



class UploadIcon(forms.ModelForm):
    icon = forms.FileField()


class EditProfileForm(UserChangeForm):
    username = forms.CharField(max_length=100,  widget=forms.TextInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username']
 
class UpdatePassword(PasswordChangeForm):
    old_password = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'class': 'form-control'}))
    new_password1 = forms.CharField(max_length=100,  widget=forms.TextInput(attrs={'class': 'form-control', 'label': 'new Password'}))
    new_password2 = forms.CharField(max_length=100,  widget=forms.TextInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ('old_password', 'new_password1', 'new_password2')
        
    def __init__(self, *args, **kwargs):
        super(UpdatePassword, self).__init__(*args, **kwargs)
        self.fields['new_password1'].label = "New Password"
        self.fields['new_password2'].label = "Confirm New Password"