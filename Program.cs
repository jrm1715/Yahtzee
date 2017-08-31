using System;
using System.Collections.Generic;
using System.Linq;

namespace Projects
{
    class Program
    {
        // Converts array to list and runs program
        static void Main(string[] args)
        {
            int[] initialSequence = {-2, 8, 1};
            List<int> sequenceList = new List<int>(initialSequence);
            AlmostSequence(ref sequenceList);
        }

        // Checks if items in list or almost Sequence
        private static bool AlmostSequence(ref List<int> sequence)
        {
            if (IsSequence(ref sequence) == true)
            {
                return true;
            } else {
                RemoveItem(ref sequence);
            }
            return true;
        }

        // Compares each item in the list. If b > a and returns false if b < a 
        private static bool IsSequence(ref List<int> sequence)
        {
             for (int i = 0; i < sequence.Count - 1; i++)
            {
                if (sequence[i+1] > sequence[i])
                {
                    continue;
                } else {
                    
                    
                    return false;
                }                
            }
            return true;
        }

        private static List<int> RemoveItem(ref List<int> sequence)
        {
            
        }
    }
}


/* check if list is strictly sequence
   if it is strictly sequence return true
   else if sequence is not true
   remove sequence[i+1] and re-check if sequene is strictly sequence */