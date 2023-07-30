import re
import sys
import os

module_dir = os.path.dirname(__file__)
if module_dir not in sys.path:
    sys.path.append(module_dir)
from _unity_mixamo_util import mixamo_prefix


def rename(context, bone_name):
    # Define a dictionary for the conversions
    conversion_dict = {
        'hipsINT': 'mixamorig1:Hips',
        'spineINT': 'mixamorig1:Spine',
        'spinel INT': 'mixamorig1:Spine1',
        'spine2INT': 'mixamorig1:Spine2',
        'l_shoulderINT': 'mixamorig1:LeftShoulder',
        'I_armINT': 'mixamorig1:LeftArm',
        'l_forearmINT': 'mixamorig1:LeftForeArm',
        'I_handINT': 'mixamorig1:LeftHand',
        'I_handThumb1INT': 'mixamorig1:LeftHandThumb1',
        'l_handThumb2INT': 'mixamorig1:LeftHandThumb2',
        'l_handThumb3INT': 'mixamorig1:LeftHandThumb3',
        'l_handlndex1INT': 'mixamorig1:LeftHandlndex1',
        'l_handlndex2INT': 'mixamorig1:LeftHandlndex2',
        'l_handlndex3INT': 'mixamorig1:LeftHandlndex3',
        'l_handPinky1INT': 'mixamorig1:LeftHandPinky1',
        'l_handPinky2INT': 'mixamorig1:LeftHandPinky2',
        'l_handPinky3INT': 'mixamorig1:LeftHandPinky3',
        'l_handRing1INT': 'mixamorig1:LeftHandRing1',
        'l_handRing2INT': 'mixamorig1:LeftHandRing2',
        'l_handRing3INT': 'mixamorig1:LeftHandRing3',
        'l_handMiddle1INT': 'mixamorig1:LeftHandMiddle1',
        'l_handMiddle2INT': 'mixamorig1:LeftHandMiddle2',
        'l_handMiddle3INT': 'mixamorig1:LeftHandMiddle3',
        'r_shoulderINT': 'mixamorig1:RightShoulder',
        'r_armINT': 'mixamorig1:RightArm',
        'r_forearmINT': 'mixamorig1:RightForeArm',
        'r_handINT': 'mixamorig1:RightHand',
        'r_handThumb1INT': 'mixamorig1:RightHandThumb1',
        'r_handThumb2INT': 'mixamorig1:RightHandThumb2',
        'r_handThumb3INT': 'mixamorig1:RightHandThumb3',
        'r_handRing1INT': 'mixamorig1:RightHandRing1',
        'r_handRing2INT': 'mixamorig1:RightHandRing2',
        'r_handRing3INT': 'mixamorig1:RightHandRing3',
        'r_handPinky1INT': 'mixamorig1:RightHandPinky1',
        'r_handPinky2INT': 'mixamorig1:RightHandPinky2',
        'r_handPinky3INT': 'mixamorig1:RightHandPinky3',
        'r_handMiddle1INT': 'mixamorig1:RightHandMiddle1',
        'r_handMiddle2INT': 'mixamorig1:RightHandMiddle2',
        'r_handMiddle3INT': 'mixamorig1:RightHandMiddle3',
        'r_handlndex1INT': 'mixamorig1:RightHandlndex1',
        'r_handlndex2INT': 'mixamorig1:RightHandlndex2',
        'r_handlndex3INT': 'mixamorig1:RightHandlndex3',
        'neckINT': 'mixamorig1:Neck',
        'head INT': 'mixamorig1:Head',
        'headCenterINT': 'mixamorig1:HeadTop End',
        'r_uplegINT': 'mixamorig1:RightUpLeg',
        'r_legINT': 'mixamorig1:RightLeg',
        'r_footINT': 'mixamorig1:RightFoot',
        'r_toebaseINT': 'mixamorig1:RightToeBase',
        'I_uplegINT': 'mixamorig1:LeftUpLeg',
        'l_legINT': 'mixamorig1:LeftLeg',
        'l_footINT': 'mixamorig1:LeftFoot',
        'l_toebaseINT': 'mixamorig1:LeftToeBase',
    }

# Regular expression to find words that are keys in the conversion_dict
    regex_pattern = r'\b(?:' + '|'.join(map(re.escape, conversion_dict.keys())) + r')\b'

    # Check if bone_name is not None
    if bone_name is not None:
        # Replace matched words with their corresponding values from the conversion_dict
        converted_bone_name = re.sub(regex_pattern, lambda match: conversion_dict[match.group()], bone_name)

        # Debug logs
        print(f"Original bone_name: {bone_name}")
        print(f"Modified bone_name: {converted_bone_name}")

        # Return the converted bone_name
        return mixamo_prefix + converted_bone_name

    # Return None if bone_name is None
    return None