import TermsAndConditions from "@/components/consent/termAndCondition";
import ThemedButton from "@/components/themed/ThemedButton";
import { View } from "react-native";
import {config} from "@/app/config"
import { useAuth } from '@/app/context/AuthContext'; // adjust path if needed


 const TermsAndConditionsScreen = () => {
    const { token } = useAuth();

    const handleAccept = async () => {
        try {
      
          const res = await fetch(`${config.apiBaseUrl}/user/consent`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // or JWT if needed
            },
            body: JSON.stringify({ consent: true }),
          });
      
          const data = await res.json();
      
          if (res.ok) {
            // navigate or give success message
            alert('Consent recorded. Proceeding...');
            // router.push('/next-screen'); // if using navigation
          } else {
            alert(`Failed to update consent: ${data?.error}`);
          }
        } catch (err) {
          console.error('Consent update error:', err);
          alert('Unexpected error occurred.');
        }
      };
      

   return (
    <View>
        <TermsAndConditions/>
        <ThemedButton 
            title={"Accept and Continue"}
            onPress={handleAccept}/>
    </View>
   )
}

export default TermsAndConditionsScreen;