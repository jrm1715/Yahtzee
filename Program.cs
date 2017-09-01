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
            int i = new int();
            int[] initialSequence = {3, 5, 67, 98, 3};
            List<int> sequenceList = new List<int>(initialSequence);
            Console.WriteLine(AlmostSequence(ref sequenceList, i));
        }
        // Checks if items in list or almost Sequence
        private static bool AlmostSequence(ref List<int> sequence, int i)       
         {            
            if (IsSequential(ref sequence, out i)) 
            {
                return true;
            } else {
                RemoveItem(ref sequence, i);
                IsSequential(ref sequence, out i);

                if (IsSequential(ref sequence, out i) != true)
                {
                    return false;
                }
            }
            return true;
        }  
        private static bool IsSequential(ref List<int> sequence, out int i)
        {
            for (i = 0; i < sequence.Count - 1; i++)
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
        private static List<int> RemoveItem(ref List<int> sequence, int i)
        {           
            int itemAtIndex = sequence[i+1];
            sequence.Remove(itemAtIndex); 
            return sequence;                   
        }
    }
}