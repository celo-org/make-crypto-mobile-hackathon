import React from 'react'
import { Spinner } from '@ui-kitten/components'
import { View } from 'react-native'

export const LoadingIndicator = (props) => (
    <View style={props.style}>
        <Spinner size='small' status='control'/>
    </View>
);