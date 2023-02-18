from django import template
#from .models import Service

register = template.Library()

@register.simple_tag
def concat( path_str, path_var ):
	return path_str + str(path_var)